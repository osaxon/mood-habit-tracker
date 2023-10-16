import { getUsers } from "@/app/actions";
import { AuthenticationError, auth } from "@/libs/authconfig";
import { DataTable } from "../components/data-table";
import { columns } from "./components/columns";

export default async function UsersPage() {
    const session = await auth();

    if (!session || !session.user) {
        throw new AuthenticationError();
    }
    const users = await getUsers();
    const { user } = session;

    return (
        <div className="px-4 py-2 space-y-6">
            <p className="font-bold text-2xl text-muted">Users page</p>
            {users && <DataTable columns={columns} data={users} />}
        </div>
    );
    2;
}
