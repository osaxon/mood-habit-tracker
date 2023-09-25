import { getHabitDefinitions } from "@/app/actions";
import HabitDefCard from "./HabitDefCard";

export default async function Activities() {
    const habitDefitions = await getHabitDefinitions();
    return (
        <div className="grid @lg:grid-cols-2 grid-cols-1 gap-4">
            {habitDefitions &&
                habitDefitions.map((habit) => (
                    <HabitDefCard key={habit.id} habitDefinition={habit} />
                ))}
        </div>
    );
}
