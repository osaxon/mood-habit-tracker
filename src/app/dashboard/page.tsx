import GoalCard from "@/components/GoalCard";
import TotalMinutesCard from "@/components/TotalMinutesCard";

export default function Page() {
    return (
        <div className="grid @lg:grid-cols-2 gap-2 py-10">
            <GoalCard />
            <TotalMinutesCard />
        </div>
    );
}
