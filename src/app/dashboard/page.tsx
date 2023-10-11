import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth, AuthenticationError } from "../../libs/authconfig";
import Dashboard from "./_components/dashboard";

export default async function Page() {
    const session = await auth();

    // Middleware handles redirects to sign in for unauthenticated or unauthorised users
    // Errors with the session will throw an Error and re-direct to error.tsx
    if (!session || !session.user) {
        throw new AuthenticationError();
    }

    const {
        user: { id },
    } = session;

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
}
