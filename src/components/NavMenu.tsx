"use client";
import { useTheme } from "next-themes";

import { cn } from "@/libs/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./container";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

import { getUserInitials } from "@/libs/utils";

const UserMenu = ({ session }: { session: Session }) => {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-4">
            {pathname === "/" && (
                <Button className="hidden md:block" asChild>
                    <Link href="/dashboard">Your Dashboard</Link>
                </Button>
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative h-8 w-8 border rounded-full"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={session.user?.image ?? ""} />
                            <AvatarFallback>
                                {getUserInitials(session.user?.name ?? "")}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {session.user?.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session.user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                        <Button className="w-full justify-start" asChild>
                            <Link className="text-left" href="/profile">
                                Dashboard
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                        >
                            <Link className="text-left" href="/profile">
                                Profile
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                        >
                            <Link className="text-left" href="/">
                                Docs
                            </Link>
                        </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() =>
                                signOut({
                                    callbackUrl: `${window.location.origin}`,
                                })
                            }
                        >
                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {session.user?.role === "ADMIN" && (
                        <DropdownMenuItem>
                            <Button
                                className="w-full"
                                size="sm"
                                asChild
                                variant="destructive"
                            >
                                <Link href="/admin">Admin Panel</Link>
                            </Button>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default function NavMenu() {
    const { data: session } = useSession();

    return (
        <header className="border-b border-muted w-full">
            <Container
                as="div"
                width="wide"
                className="flex items-center justify-between"
            >
                <Link className="flex gap-2 items-center" href="/">
                    <Image
                        alt="brand logo"
                        width={48}
                        height={48}
                        src="/lotus-flower.png"
                    />
                    <p
                        className={cn(
                            "text-4xl font-bold",
                            spaceGrotesk.className
                        )}
                    >
                        {`Hab:It..`}
                    </p>
                </Link>
                <div className="flex items-center gap-2">
                    {session && session.user ? (
                        <UserMenu session={session} />
                    ) : (
                        <Button
                            onClick={() =>
                                signIn(undefined, {
                                    callbackUrl: `${window.location.origin}/dashboard`,
                                })
                            }
                            variant="secondary"
                        >
                            Log In
                        </Button>
                    )}
                </div>
            </Container>
        </header>
    );
}

function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    return (
        <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            size="icon"
            variant="secondary"
        >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
    );
}
