"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignInButton(props: { label: string }) {
    return (
        <Button
            className="flex gap-2"
            variant="outline"
            size="lg"
            onClick={() => signIn()}
        >
            {props.label}
        </Button>
    );
}
