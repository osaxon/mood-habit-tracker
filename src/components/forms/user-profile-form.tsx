"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    UpdateProfileInputs,
    updateProfileFormSchema,
} from "@/libs/formSchemas";
import { getUserInitials } from "@/libs/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

export function UserProfileform({ session }: { session: Session }) {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const {
        user: { name, id },
    } = session;

    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<UpdateProfileInputs>({
        mode: "onSubmit",
        resolver: zodResolver(updateProfileFormSchema),
        defaultValues: {
            email: session.user.email ?? "",
            name: session.user.name ?? "",
        },
    });

    async function onSubmit(data: UpdateProfileInputs) {
        toast({
            description: (
                <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative sm:w-2/3 w-full space-y-8"
            >
                <ProfileAvatar
                    name={name ?? ""}
                    image={session.user.image ?? ""}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="string" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="string" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

const ProfileAvatar = ({ name, image }: { name: string; image: string }) => {
    return (
        <Avatar className="w-32 h-32">
            <AvatarImage src={image} />

            <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
        </Avatar>
    );
};
