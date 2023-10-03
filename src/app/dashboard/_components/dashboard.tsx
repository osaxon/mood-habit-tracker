import { getUserDashboardData } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ProgressBar from "@/components/ui/progress-bar";
import Image from "next/image";
import RecordActivityButton from "./record-activity-button";

export default async function Dashboard({ userId }: { userId: string }) {
    const { habitInstances, habitRecords } = await getUserDashboardData({
        userId,
    });

    const totalHabitRecords = habitRecords.length;
    console.log(totalHabitRecords);

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
                                description,
                                targetUnit,
                                targetFreq,
                                direction,
                                category,
                                targetValue,
                                duration,
                                durationUnit,
                                icon,
                            } = habitDefinition;
                            const records = habitRecords.filter(
                                ({ habitInstanceId }) => habitInstanceId === id
                            );
                            return (
                                <Card
                                    className="relative overflow-clip"
                                    key={id}
                                >
                                    <CardHeader>
                                        <CardTitle>{habitName}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted">
                                                {records.length}
                                            </span>
                                            <ProgressBar
                                                size="sm"
                                                progress={
                                                    (records.length /
                                                        duration) *
                                                    100
                                                }
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-end">
                                            <Image
                                                width={80}
                                                height={80}
                                                alt=""
                                                className="opacity-25"
                                                src={`/habit-icons/${icon}`}
                                            />
                                            <div>
                                                <p>{targetFreq} challenge</p>
                                                <p>
                                                    Record activity for the next{" "}
                                                    {duration} {durationUnit}
                                                    {duration > 1 && "s"}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="gap-4">
                                        <RecordActivityButton
                                            habitInstanceId={id}
                                            userId={userId}
                                            value={1}
                                        />
                                        <Button variant="secondary">
                                            View Activity
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        }
                    )}
                </div>
            )}
        </section>
    );
}
