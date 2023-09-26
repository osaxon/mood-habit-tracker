"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { HabitWithRelations } from "../types/prisma";
import { Button } from "./ui/button";

export default function GoalCard({
    habit,
    children,
}: {
    habit: HabitWithRelations;
    children: React.ReactNode;
}) {
    console.log(habit);
    const {
        active,
        target,

        completedAt,
        habitDefinition,
    } = habit;
    const { targetUnit, targetFreq } = habitDefinition;
    const [goal, setGoal] = useState(target);

    const { habitName } = habitDefinition;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{habitName}</CardTitle>
                <CardDescription>
                    Set your {targetFreq.toLowerCase()} activity goal
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <Button
                        className="rounded-full"
                        variant="outline"
                        size="icon"
                        onClick={() => setGoal(goal - 1)}
                    >
                        <MinusIcon />
                    </Button>

                    <div className="flex flex-col justify-center items-center gap-2">
                        <span className="text-2xl font-bold">{goal}</span>
                        <span className="font-thin text-xs uppercase">
                            {targetUnit} - {targetFreq}
                        </span>
                    </div>

                    <Button
                        className="rounded-full"
                        variant="outline"
                        size="icon"
                        onClick={() => setGoal(goal + 1)}
                    >
                        <PlusIcon />
                    </Button>
                </div>
                <div className="h-[80px]">{children}</div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Add Data</Button>
            </CardFooter>
        </Card>
    );
}
