import { auth } from "../../libs/authconfig";

export default async function Page() {
    const session = await auth();

    return (
        <div>
            <p>Admin panel</p>
        </div>
    );
    2;
}
