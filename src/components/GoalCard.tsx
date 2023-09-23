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
import TinyBarChart from "./TinyBarChart";
import { Button } from "./ui/button";

export default function GoalCard() {
    const [goal, setGoal] = useState(10);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Goal</CardTitle>
                <CardDescription>Set your daily activity goal</CardDescription>
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
                    <div className="flex flex-col justify-center items-center py-4 gap-2">
                        <span className="text-4xl font-bold">{goal}</span>
                        <span className="font-thin text-xs uppercase">
                            Minutes meditation per day
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
                <div className="h-[80px]">
                    <TinyBarChart />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Set goal</Button>
            </CardFooter>
        </Card>
    );
}
