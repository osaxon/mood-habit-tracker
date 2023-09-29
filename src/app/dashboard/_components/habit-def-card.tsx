import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { HabitDefinition } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddHabitButton from "./add-habit-button";

export default function HabitDefCard({
    habitDefinition,
    userId,
    userSelected,
    ...props
}: {
    userSelected: boolean;
    habitDefinition: HabitDefinition;
    userId: string;
}) {
    const { id, habitName, duration, durationUnit, icon, description } =
        habitDefinition;

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>{habitName}</CardTitle>
                <CardDescription>
                    {duration} {durationUnit}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 items-end">
                <Image
                    width={80}
                    height={80}
                    alt=""
                    className="opacity-25"
                    src={`/habit-icons/${icon}`}
                />
                <p>{description}</p>
            </CardContent>
            <CardFooter>
                {userSelected ? (
                    <Button variant="link" asChild>
                        <Link href="/dashboard">View progress</Link>
                    </Button>
                ) : (
                    <AddHabitButton userId={userId} habitDefinitionId={id} />
                )}
            </CardFooter>
        </Card>
    );
}
