import Container from "@/components/container";
import { Authform } from "@/components/forms/auth-form";
import SignInButton from "@/components/sign-in-button";
import { GetServerSidePropsContext } from "next";
import { getCsrfToken, getProviders } from "next-auth/react";

export default async function SignUpPage(context: GetServerSidePropsContext) {
    const providers = await getProviders();
    const csrfToken = await getCsrfToken(context);

    return (
        <Container height="page" width="wide">
            <p>Sign Up</p>
            <Container width="narrow">
                <ul className="flex flex-col items-center">
                    {providers &&
                        Object.values(providers).map((provider) => {
                            if (provider.name === "Email" && csrfToken) {
                                return (
                                    <Authform
                                        key={provider.id}
                                        csrfToken={csrfToken}
                                    />
                                );
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
