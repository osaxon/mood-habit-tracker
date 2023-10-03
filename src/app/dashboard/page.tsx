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

    const { user } = session;
    const { id } = user;

    return (
        <>
            <div className="flex justify-between items-end">
                <div>
                    <p>Dashboard</p>
                    <p>This is the dashboard with all your stuff</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/habits/">Add</Link>
                </Button>
            </div>
            <Dashboard userId={id} />
        </>
    );
    2;
}
