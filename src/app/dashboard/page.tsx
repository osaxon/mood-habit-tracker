import CardSkeleton from "@/components/CardSkeleton";
import GoalCard from "@/components/GoalCard";
import HabitChart from "@/components/HabitChart";
import { redirect } from "next/navigation";
import { auth } from "../../libs/authconfig";
import { getUserDashboardData } from "../actions";

export default async function Page() {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    const { habitInstances } = await getUserDashboardData({
        id: session?.user.id,
    });

    return (
        <section className="@container bg-secondary p-4 w-full">
            <div className="grid @lg:grid-cols-2 grid-cols-1 gap-4">
                {habitInstances &&
                    habitInstances.map((habit) => (
                        <GoalCard habit={habit} key={habit.id}>
                            <HabitChart
                                target={habit.target}
                                habitId={habit.id}
                            />
                        </GoalCard>
                    ))}
                {habitInstances.length < 1 && <CardSkeleton />}
            </div>
        </section>
    );
}
