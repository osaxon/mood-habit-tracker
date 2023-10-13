"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";

interface SignInButtonProps {
    providerId: string;
    providerName: string;
}

export default function SignInButton(props: SignInButtonProps) {
    return (
        <Button
            className="flex gap-2"
            variant="outline"
            size="lg"
            onClick={() => signIn(props.providerId)}
        >
            {props.providerName === "GitHub" && (
                <Image
                    width={48}
                    height={48}
                    src="/app-icons/github.png"
                    alt="GitHub logo"
                    className="w-5 h-5"
                />
            )}
            <span>Sign in with {props.providerName}</span>
        </Button>
    );
}
