import GoalCard from "@/components/GoalCard";
import Sidebar from "@/components/Sidebar";
import TotalMinutesCard from "@/components/TotalMinutesCard";

export default function Page() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <section className="@container bg-primary-foreground p-4 w-full">
                <div className="grid @lg:grid-cols-2 grid-cols-1 gap-4">
                    <GoalCard />
                    <TotalMinutesCard />
                </div>
            </section>
        </div>
    );
}
