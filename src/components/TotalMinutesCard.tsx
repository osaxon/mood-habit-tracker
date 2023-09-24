"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import TinyLineChart from "./TinyLineChart";
import { Button } from "./ui/button";

export default function TotalMinutesCard() {
    const [goal, setGoal] = useState(10);
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Total Minutes</CardTitle>
                <CardDescription>
                    Total exercise minutes this week
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <p className="text-2xl font-bold">130 min</p>
                    <p className="uppercase font-thin text-xs">
                        Av. 16 minutes per day.
                    </p>
                </div>
                <div className="h-[80px]">
                    <TinyLineChart />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Add data</Button>
            </CardFooter>
        </Card>
    );
}
