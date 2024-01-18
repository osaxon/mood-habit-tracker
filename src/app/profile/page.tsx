import Container from "@/components/container";
import { NewUserForm } from "@/components/forms/new-user-form";
import ProfileImage from "@/components/profile-image";
import { AuthenticationError, auth } from "@/libs/authconfig";

export default async function ProfilePage() {
    const session = await auth();
    if (!session || !session.user) {
        throw new AuthenticationError();
    }
    const { user } = session;
    const { id } = user;

    return (
        <Container as="section" width="wide" height="page">
            <section className="space-y-8">
                <h2 className="font-bold text-2xl">
                    {user.name}&apos;s profile
                </h2>

                <ProfileImage session={session} />

                <NewUserForm email={user.email ?? ""} id={id} />
            </section>
        </Container>
    );
}
