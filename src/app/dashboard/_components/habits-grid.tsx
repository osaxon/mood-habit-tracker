import { getHabitDefinitions, getUsersHabits } from "@/app/actions";
import HabitDefCard from "@/app/dashboard/_components/habit-def-card";
import { auth } from "@/libs/authconfig";

export default async function HabitsGrid() {
    const habitDefinitions = await getHabitDefinitions();

    const session = await auth();
    if (!session || !session.user) {
        return <>not authorised</>;
    }
    const { user } = session;
    const userHabits = await getUsersHabits({ userId: user.id });
    const habitDefIds = userHabits.map(
        ({ habitDefinitionId }) => habitDefinitionId
    );
    return (
        <section className="@container">
            {!habitDefinitions ? (
                <div>None found</div>
            ) : (
                <div className="grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-3 gap-4 w-full">
                    {habitDefinitions.map((habitDef) => {
                        return (
                            <HabitDefCard
                                userSelected={habitDefIds.includes(habitDef.id)}
                                key={habitDef.id}
                                habitDefinition={habitDef}
                                userId={user.id}
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
}
