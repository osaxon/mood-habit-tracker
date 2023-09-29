import { getHabitDefinitions } from "@/app/actions";
import CardSkeleton from "./CardSkeleton";
import HabitDefCard from "./HabitDefCard";

export default async function Activities() {
    const habitDefitions = await getHabitDefinitions();
    return (
        <div className="grid @lg:grid-cols-3 @md:grid-cols-2 grid-cols-1 gap-4">
            {habitDefitions &&
                habitDefitions.map((habit) => (
                    <HabitDefCard key={habit.id} habitDefinition={habit} />
                ))}
            {habitDefitions.length < 1 && <CardSkeleton />}
        </div>
    );
}
