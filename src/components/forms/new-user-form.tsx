"use client";
import { updateUser } from "@/app/actions";
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
import { useRouter } from "next/navigation";

import { NewUserFormInputs, newUserFormSchema } from "@/libs/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

interface NewUserFormProps {
    id: string;
    email: string;
}

export function NewUserForm(props: NewUserFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<NewUserFormInputs>({
        mode: "onSubmit",
        resolver: zodResolver(newUserFormSchema),
        defaultValues: {
            email: props.email,
        },
    });

    async function onSubmit(data: NewUserFormInputs) {
        // update user profile in DB and proceed to dashboard
        const completePayload = {
            id: props.id,
            data,
        };
        const { success, error } = await updateUser(completePayload);

        if (!success) {
            toast({
                variant: "destructive",
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(data, null, 2)}
                        </code>
                    </pre>
                ),
            });
        } else {
            toast({
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(data, null, 2)}
                        </code>
                    </pre>
                ),
            });
            router.replace("/dashboard/habits");
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative sm:w-2/3 w-full space-y-8"
            >
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
