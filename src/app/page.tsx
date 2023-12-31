import Container from "@/components/container";
import SignInButton from "@/components/sign-in-button";
import { Space_Grotesk } from "next/font/google";
import { cn } from "../libs/utils";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default async function Home() {
    return (
        <Container
            as="section"
            width="narrow"
            height="page"
            className="flex flex-col items-stretch"
        >
            <div
                className={cn(
                    "flex-grow flex-col gap-y-6 items-center text-center justify-center flex text-secondary-foreground",
                    spaceGrotesk.className
                )}
            >
                <p className="lg:text-6xl text-5xl font-bold">
                    Cultivate Stronger Habits, Forge a Fulfilling Life.
                </p>
                <p className="lg:text-2xl text-xl">
                    Leverage our custom habit tracker tool to optimize your
                    daily activities and realize your aspirations.
                </p>
                <div className="p-6">
                    <SignInButton label="Try for Free" />
                </div>
            </div>
        </Container>
    );
}
