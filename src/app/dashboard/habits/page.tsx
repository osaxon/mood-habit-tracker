import { Button } from "@/components/ui/button";
import { auth } from "@/libs/authconfig";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import HabitsGrid from "../_components/habits-grid";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default async function Page() {
    const session = await auth();
    if (!session || !session.user) {
        return <>unauthorised</>;
    }

    return (
        <>
            <div className="flex justify-between items-end">
                <div>
                    <p className="font-bold text-2xl">Select Habits</p>
                    <p>Pick one or more habits to track on your dashboard</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            </div>
            <HabitsGrid />
        </>
    );
}
