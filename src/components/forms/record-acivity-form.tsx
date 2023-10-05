"use client";
import { addHabitRecord } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    addHabitRecordSchema,
    type AddHabitRecordInputs,
} from "@/libs/formSchemas";
import { cn } from "@/libs/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { dialogClose } from "../ui/dialog";
import { useToast } from "../ui/use-toast";

type Action = "add" | "subtract";

interface HandleDateChangeProps {
    action: Action;
    amount: number;
}

export function RecordAcivityForm({
    habitInstanceId,
    userId,
}: {
    habitInstanceId: string;
    userId: string;
}) {
    const { toast } = useToast();

    const form = useForm<AddHabitRecordInputs>({
        mode: "onSubmit",
        resolver: zodResolver(addHabitRecordSchema),
        defaultValues: {
            habitInstanceId,
            userId,
            value: 0,
        },
    });

    const currentValue = form.watch("value");

    async function onSubmit(data: AddHabitRecordInputs) {
        // toast({
        //     description: (
        //         <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
        //             <code className="text-white">
        //                 {JSON.stringify(data, null, 2)}
        //             </code>
        //         </pre>
        //     ),
        // });

        await addHabitRecord(data);
        dialogClose();
        toast({
            description: (
                <div className="flex items-center gap-4">
                    <CheckCircledIcon className="stroke-emerald-500 w-8 h-8" />
                    <p className="tracking-wide">Good job!</p>
                </div>
            ),
        });
    }

    function handleDateChange({ action, amount }: HandleDateChangeProps) {
        switch (action) {
            case "add":
                form.setValue(
                    "createdDate",
                    dayjs(new Date()).add(amount, "day").toDate()
                );
                break;
            case "subtract":
                form.setValue(
                    "createdDate",
                    dayjs(new Date()).subtract(amount, "day").toDate()
                );
                break;
            default:
                form.setValue("createdDate", dayjs(new Date()).toDate());
        }
    }

    function handleSetValue(amount: number) {
        form.setValue("value", amount + currentValue);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
                <FormField
                    control={form.control}
                    name="createdDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            type="button"
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        initialFocus
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            handleDateChange({
                                action: "add",
                                amount: 0,
                            })
                        }
                    >
                        Today
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            handleDateChange({
                                action: "subtract",
                                amount: 1,
                            })
                        }
                    >
                        Yesterday
                    </Button>
                </div>

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

                <div className="flex gap-2">
                    <Button
                        type="button"
                        onClick={() => handleSetValue(5)}
                        variant="ghost"
                        size="sm"
                    >
                        +5
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleSetValue(10)}
                        variant="ghost"
                        size="sm"
                    >
                        +10
                    </Button>
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
