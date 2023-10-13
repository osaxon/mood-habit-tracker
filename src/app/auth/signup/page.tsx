import Container from "@/components/container";
import { Authform } from "@/components/forms/auth-form";
import SignInButton from "@/components/sign-in-button";
import { getProviders } from "next-auth/react";

export default async function SignUpPage() {
    const providers = await getProviders();

    return (
        <Container height="page" width="wide">
            <p>Sign Up</p>
            <Container width="narrow">
                <ul className="flex flex-col items-center">
                    {providers &&
                        Object.values(providers).map((provider) => {
                            if (provider.name === "Email") {
                                return <Authform key={provider.id} />;
                            } else {
                                return (
                                    <div key={provider.name} className="mb-3">
                                        <SignInButton
                                            providerId={provider.id}
                                            providerName={provider.name}
                                        />
                                    </div>
                                );
                            }
                        })}
                </ul>
            </Container>
        </Container>
    );
}
