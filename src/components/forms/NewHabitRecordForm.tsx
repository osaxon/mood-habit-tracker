"use client";
import { addHabitRecord } from "@/app/actions";
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
import { addHabitRecordSchema } from "@/libs/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function NewHabitRecordForm({
    id,
    userId,
}: {
    id: string;
    userId: string;
}) {
    const router = useRouter();

    const form = useForm<z.infer<typeof addHabitRecordSchema>>({
        resolver: zodResolver(addHabitRecordSchema),
        defaultValues: {
            habitInstanceId: id,
            userId: userId,
        },
    });

    async function onSubmit(values: z.infer<typeof addHabitRecordSchema>) {
        const { data, success, error } = await addHabitRecord(values);
        if (success) {
            form.reset();
            router.replace("/dashboard");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Value</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="habitInstanceId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Habit</FormLabel>
                            <FormControl>
                                <Input type="string" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User</FormLabel>
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
