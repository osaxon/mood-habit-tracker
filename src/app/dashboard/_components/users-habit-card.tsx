import { getChartData } from "@/app/actions";
import { RecordAcivityForm } from "@/components/forms/record-acivity-form";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { HabitInstanceWithRelations } from "@/types/prisma";
import RecordActivityModal from "./record-activity-dialog";
import UserHabitCardContent from "./users-habit-card-content";

export default async function UsersHabitCard({
    habitInstance,
    userId,
    ...props
}: {
    habitInstance: HabitInstanceWithRelations;
    userId: string;
}) {
    const { id, habitDefinition } = habitInstance;
    const { habitName, targetValue, targetFreq } = habitDefinition;

    const freqLabel =
        targetFreq === "Daily" ? "day" : targetFreq === "Weekly" ? "week" : "";

    const chartData = await getChartData(id, targetFreq);

    return (
        <Card {...props} className="relative overflow-clip" key={id}>
            <CardHeader>
                <CardTitle>{habitName}</CardTitle>
            </CardHeader>
            <CardContent>
                <UserHabitCardContent
                    chartData={chartData}
                    freqLabel={freqLabel}
                    targetValue={targetValue}
                />
            </CardContent>
            <CardFooter className="gap-4">
                <RecordActivityModal>
                    <RecordAcivityForm userId={userId} habitInstanceId={id} />
                </RecordActivityModal>
            </CardFooter>
        </Card>
    );
}
