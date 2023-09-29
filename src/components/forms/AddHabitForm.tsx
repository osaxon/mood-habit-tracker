"use client";
import { addHabitInstance } from "@/app/actions";
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
import { addHabitSchema } from "@/libs/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { HabitDefinition } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function AddHabitForm({
    userId,
    habitDef,
}: {
    userId: string;
    habitDef: HabitDefinition;
}) {
    const router = useRouter();
    const { id, targetFreq, targetUnit } = habitDef;
    const form = useForm<z.infer<typeof addHabitSchema>>({
        resolver: zodResolver(addHabitSchema),
        defaultValues: {
            habitDefinitionId: id,
            userId: userId,
        },
    });

    async function onSubmit(values: z.infer<typeof addHabitSchema>) {
        const { data, success, error } = await addHabitInstance(values);
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
                    name="target"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Target</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="habitDefinitionId"
                    render={({ field }) => (
                        <FormItem className="hidden">
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
                        <FormItem className="hidden">
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
