"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

import { cn } from "@/lib/utils";
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

const AuthButton = () => {
    const { data: session } = useSession();
    console.log(session);

    if (session) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full">
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
                                shadcn
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                m@example.com
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
        );
    }

    return (
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
    );
};

export default function NavMenu() {
    const pathname = usePathname();

    return (
        <header className="flex w-full justify-between items-center">
            <div className="flex gap-2 items-center">
                <Image
                    alt="brand logo"
                    width={48}
                    height={48}
                    src="/lotus-flower.png"
                />
                <p className={cn("text-4xl font-bold", spaceGrotesk.className)}>
                    Mooodz
                </p>
            </div>

            <AuthButton />
        </header>
    );
}
