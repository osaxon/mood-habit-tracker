import { AuthenticationError, auth } from "@/libs/authconfig";

export default async function ConfigPage() {
    const session = await auth();

    if (!session || !session.user) {
        throw new AuthenticationError();
    }

    const { user } = session;

    return (
        <div className="px-4 py-2">
            <p className="font-bold text-2xl text-muted">Config page</p>
        </div>
    );
    2;
}
