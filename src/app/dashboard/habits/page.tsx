import Habits from "@/components/Habits";
import { auth } from "@/libs/authconfig";
import { cn } from "@/libs/utils";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default async function Page() {
    const session = await auth();

    return (
        <section className="@container p-4 w-full">
            <h2 className={cn("font-bold", spaceGrotesk.className)}>
                Activities
            </h2>
            <div className="grid @lg:grid-cols-2 grid-cols-1 gap-4">
                <Habits />
            </div>
        </section>
    );
}
