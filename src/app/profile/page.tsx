import Container from "@/components/container";
import { AuthenticationError, auth } from "@/libs/authconfig";
import ProfileImage from "./components/profile-image";

export default async function ProfilePage() {
    const session = await auth();

    if (!session || !session.user) {
        throw new AuthenticationError();
    }

    return (
        <Container as="section" width="wide" height="page">
            <h2 className="font-bold text-2xl">Profile page</h2>
            <ProfileImage session={session} />
        </Container>
    );
}
