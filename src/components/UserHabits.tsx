import { getUserDashboardData } from "@/app/actions";
import { UserWithData } from "@/app/lib/prisma";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";

export default async function UserHabits({ userId }: { userId: string }) {
    const data: UserWithData = await getUserDashboardData({ id: userId });
    const habitDefitions = data.habitDefinitions || [];
    return (
        <div className="grid @lg:grid-cols-2 grid-cols-1 gap-4">
            {habitDefitions &&
                habitDefitions.map(
                    ({ id, habitName, dailyTarget, targetUnit, createdAt }) => (
                        <Card key={id}>
                            <CardHeader>
                                <CardTitle>{habitName}</CardTitle>
                                <CardDescription>
                                    {dayjs(createdAt).format("D MMM YY")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    {dailyTarget} {targetUnit} per day
                                </div>
                            </CardContent>
                            <CardFooter>Footer</CardFooter>
                        </Card>
                    )
                )}
        </div>
    );
}
