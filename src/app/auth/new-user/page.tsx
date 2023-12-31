import Container from "@/components/container";
import { NewUserForm } from "@/components/forms/new-user-form";
import { AuthenticationError, auth } from "@/libs/authconfig";
import ProfileImage from "./components/profile-image";

export default async function NewUserPage() {
    const session = await auth();
    if (!session || !session.user) {
        throw new AuthenticationError();
    }
    const { user } = session;
    const { id } = user;

    return (
        <Container className="space-y-8" width="narrow" height="page">
            <h2 className="font-bold text-2xl">Please complete your profile</h2>
            <section className="space-y-8">
                <ProfileImage session={session} />

                <NewUserForm email={user.email ?? ""} id={id} />
            </section>
        </Container>
    );
}
