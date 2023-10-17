import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { AuthenticationError, auth } from "../../libs/authconfig";
import { getAdminDashboardData } from "../actions";

export default async function Page() {
    const session = await auth();

    if (!session || !session.user) {
        throw new AuthenticationError();
    }

    const { users, invitations } = await getAdminDashboardData();

    const { user } = session;

    return (
        <div className="px-4 py-2 @container space-y-8">
            <p className="font-bold text-2xl text-muted">
                Welcome, {user.name}
            </p>
            <section className="grid @2xl:grid-cols-3 @xl:grid-cols-2 grid-cols-1 gap-4 @container">
                <Card>
                    <CardHeader>Active Users</CardHeader>

                    <CardContent>
                        <Link
                            href="/admin/users"
                            className="font-bold text-2xl cursor-pointer"
                        >
                            {users?.length}
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>Invited Users</CardHeader>
                    <CardContent>
                        <Link
                            href="/admin/invitations"
                            className="font-bold text-2xl cursor-pointer"
                        >
                            {invitations?.length}
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>Access Requests</CardHeader>
                    <CardContent>
                        <Link
                            href="/admin/invitations"
                            className="font-bold text-2xl cursor-pointer"
                        >
                            {(invitations?.length ?? 0) * 6}
                        </Link>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
    2;
}
