import { auth } from "@/app/lib/authconfig";
import Activities from "@/components/Activities";
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
            <div className="grid @lg:grid-cols-2 grid-cols-1 gap-4">
                <Activities />
            </div>
        </section>
    );
}
