import { getChartData } from "@/app/actions";
import TinyLineChart from "@/components/TinyLineChart";
import { RecordAcivityForm } from "@/components/forms/record-acivity-form";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import TinyBarChart from "@/components/TinyBarChart";
import { HabitInstanceWithRelations } from "@/types/prisma";
import ChartDataAccordian from "./chart-data-accordian";
import RecordActivityModal from "./record-activity-dialog";

export default async function UsersHabitCard({
    habitInstance,
    userId,
    ...props
}: {
    habitInstance: HabitInstanceWithRelations;
    userId: string;
}) {
    const { id, percentComplete, habitDefinition, expiresAt } = habitInstance;
    const { habitName, targetValue, targetFreq, targetUnit } = habitDefinition;

    const freqLabel =
        targetFreq === "Daily" ? "day" : targetFreq === "Weekly" ? "week" : "";

    const chartData = await getChartData(id, targetFreq);

    return (
        <Card {...props} className="relative overflow-clip" key={id}>
            <CardHeader>
                <CardTitle>{habitName}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                <p>Your progress for the last 7 {freqLabel}&apos;s</p>

                <div className="h-32">
                    {targetFreq === "Daily" ? (
                        <TinyLineChart data={chartData} target={targetValue} />
                    ) : (
                        <TinyBarChart data={chartData} target={targetValue} />
                    )}
                </div>
                <ChartDataAccordian data={chartData} />
            </CardContent>
            <CardFooter className="gap-4">
                <RecordActivityModal>
                    <RecordAcivityForm userId={userId} habitInstanceId={id} />
                </RecordActivityModal>
            </CardFooter>
        </Card>
    );
}
