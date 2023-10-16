import { getInvitations } from "@/app/actions";
import { AuthenticationError, auth } from "@/libs/authconfig";
import { DataTable } from "../components/data-table";
import { columns } from "./components/columns";
import { CreateInviteButton } from "./components/create-invite-button";

export default async function InvitationsPage() {
    const session = await auth();
    if (!session || !session.user) {
        throw new AuthenticationError();
    }

    const invitations = await getInvitations();

    const { user } = session;

    return (
        <div className="px-4 py-2 space-y-6">
            <p className="font-bold text-2xl text-muted">Invitations page</p>
            {invitations && <DataTable columns={columns} data={invitations} />}
            <CreateInviteButton />
        </div>
    );
    2;
}
