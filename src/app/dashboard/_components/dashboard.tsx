import { getUserDashboardData } from "@/app/actions";

import UsersHabitCard from "./users-habit-card";

export default async function Dashboard({ userId }: { userId: string }) {
    const { habitInstances } = await getUserDashboardData({
        userId,
    });

    return (
        <section className="@container">
            {!habitInstances ? (
                <div>You have no active habits</div>
            ) : (
                <div className="grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-3 gap-4 w-full">
                    {habitInstances.map((habitInstance) => {
                        return (
                            <UsersHabitCard
                                key={habitInstance.id}
                                habitInstance={habitInstance}
                                userId={userId}
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
}
