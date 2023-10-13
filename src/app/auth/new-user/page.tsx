import Container from "@/components/container";
import { NewUserForm } from "@/components/forms/new-user-form";
import { AuthenticationError, auth } from "@/libs/authconfig";

export default async function NewUserPage() {
    const session = await auth();
    if (!session || !session.user) {
        throw new AuthenticationError();
    }
    const { user } = session;
    const { id } = user;
    console.log(id);

    return (
        <Container width="narrow" height="page">
            <h2 className="font-bold text-2xl">Please complete your profile</h2>
            <NewUserForm email={user.email ?? ""} id={id} />
        </Container>
    );
}
