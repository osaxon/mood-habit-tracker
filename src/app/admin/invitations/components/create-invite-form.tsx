"use client";
import { createInvite } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { dialogClose } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
    createInviteFormSchema,
    type CreateInviteInputs,
} from "@/libs/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function CreateInviteForm() {
    const form = useForm<CreateInviteInputs>({
        mode: "onSubmit",
        resolver: zodResolver(createInviteFormSchema),
    });

    async function onSubmit(data: CreateInviteInputs) {
        toast({
            description: (
                <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });

        await createInvite(data);

        dialogClose();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative space-y-8"
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

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
