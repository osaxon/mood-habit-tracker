"use client";
import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

import { cn } from "@/libs/utils";
import { Session } from "next-auth";
import Link from "next/link";
import Container from "./container";
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

function getUserInitials(name: string) {
    const [first, last] = name.split(" ");
    return `${first.charAt(0)}${last.charAt(0)}`;
}

const UserMenu = ({ session }: { session: Session }) => {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-4">
            {pathname === "/" && (
                <Button variant="outline" asChild>
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
                    <Button
                        variant="ghost"
                        asChild
                        className="w-full"
                        onClick={() =>
                            signOut({
                                callbackUrl: `${window.location.origin}`,
                            })
                        }
                    >
                        <DropdownMenuItem>
                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Button>

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
                    <ul className="flex items-center gap-2">
                        <Button asChild variant="link">
                            <Link href="/">Docs</Link>
                        </Button>
                        <Button asChild variant="link">
                            <Link href="/">Billing</Link>
                        </Button>
                    </ul>

                    <ThemeToggle />

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
