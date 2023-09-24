import { auth } from "@/app/lib/authconfig";
import UserHabits from "@/components/UserHabits";
import { cn } from "@/lib/utils";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default async function Page() {
    const session = await auth();

    return (
        <section className="@container bg-secondary p-4 w-full">
            <h2 className={cn("font-bold", spaceGrotesk.className)}>
                Activities
            </h2>
            <UserHabits userId={session?.user.id as string} />
        </section>
    );
}
