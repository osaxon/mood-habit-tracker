import Container from "@/components/container";
import { UserProfileform } from "@/components/forms/user-profile-form";
import ProfileImage from "@/components/profile-image";
import { AuthenticationError, auth } from "@/libs/authconfig";

export default async function NewUserPage() {
    const session = await auth();
    if (!session || !session.user) {
        throw new AuthenticationError();
    }
    const { user } = session;
    const { id } = user;

    return (
        <Container className="space-y-8" width="wide" height="page">
            <h2 className="font-bold text-2xl">Please complete your profile</h2>
            <section className="space-y-8">
                <ProfileImage session={session} />

                <UserProfileform session={session} />
            </section>
        </Container>
    );
}
