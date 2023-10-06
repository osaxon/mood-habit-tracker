"use client";
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
                <Link href="/dashboard">
                    <Button variant="outline">Your Dashboard</Button>
                </Link>
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative border rounded-full"
                    >
                        <Avatar>
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
                                {session.user.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session.user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() =>
                            signOut({
                                callbackUrl: `${window.location.origin}`,
                            })
                        }
                    >
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default function NavMenu() {
    const { data: session } = useSession();

    return (
        <header className="border-b border-muted-foreground w-full">
            <Container as="div" className="flex items-center justify-between">
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

                {session && session.user ? (
                    <UserMenu session={session} />
                ) : (
                    <Button
                        onClick={() =>
                            signIn(undefined, {
                                callbackUrl: `${window.location.origin}/dashboard`,
                            })
                        }
                        variant="default"
                    >
                        Log In
                    </Button>
                )}
            </Container>
        </header>
    );
}
