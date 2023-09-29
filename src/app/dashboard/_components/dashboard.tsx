"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ProgressBar from "@/components/ui/progress-bar";
import { HabitInstanceWithRelations } from "@/types/prisma";
import Image from "next/image";

export default function Dashboard({
    habitInstances,
}: {
    habitInstances: HabitInstanceWithRelations[];
}) {
    console.log(habitInstances);
    return (
        <section className="@container">
            {!habitInstances ? (
                <div>You have no active habits</div>
            ) : (
                <div className="grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-3 gap-4 w-full">
                    {habitInstances.map(
                        ({ id, percentComplete, habitDefinition }) => {
                            const {
                                habitName,
                                targetUnit,
                                targetFreq,
                                direction,
                                category,
                                targetValue,
                                icon,
                            } = habitDefinition;
                            return (
                                <Card
                                    className="relative overflow-clip"
                                    key={id}
                                >
                                    <CardHeader>
                                        <CardTitle>{habitName}</CardTitle>
                                        <CardDescription></CardDescription>
                                    </CardHeader>
                                    <CardContent className="">
                                        <Image
                                            width={80}
                                            height={80}
                                            alt=""
                                            className="opacity-25"
                                            src={`/habit-icons/${icon}`}
                                        />
                                        <div className="max-w-sm">
                                            <ProgressBar
                                                progress={percentComplete}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        }
                    )}
                </div>
            )}
        </section>
    );
}
