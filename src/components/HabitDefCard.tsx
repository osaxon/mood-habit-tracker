"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { Button } from "./ui/button";

import { HabitDefinition } from "@prisma/client";
import Link from "next/link";

export default function HabitDefCard({
    habitDefinition,
}: {
    habitDefinition: HabitDefinition;
}) {
    const { id, habitName, createdAt } = habitDefinition;
    return (
        <Card>
            <CardHeader>
                <CardTitle>{habitName}</CardTitle>
                <CardDescription>
                    {dayjs(createdAt).format("D MMM YY")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>Content</div>
            </CardContent>
            <CardFooter>
                <Link href={`/dashboard/habits/add/${id}`}>
                    <Button>Add to My Dashboard</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
