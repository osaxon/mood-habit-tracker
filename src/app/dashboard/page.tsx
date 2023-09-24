import GoalCard from "@/components/GoalCard";
import TotalMinutesCard from "@/components/TotalMinutesCard";

export default function Page() {
    return (
        <section className="@container bg-secondary p-4 w-full">
            <div className="grid @lg:grid-cols-2 grid-cols-1 gap-4">
                <GoalCard />
                <TotalMinutesCard />
            </div>
        </section>
    );
}
