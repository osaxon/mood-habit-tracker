import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../libs/authconfig";
import Dashboard from "./_components/dashboard";

export default async function Page() {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }
    console.log(session);
    const { user } = session;
    const { id } = user;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end py-4">
                <div>
                    <p className="font-bold text-2xl">Dashboard</p>
                    <p>This is the dashboard with all your stuff</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/habits/">Add</Link>
                </Button>
            </div>

            <Dashboard userId={id} />
        </div>
    );
    2;
}
