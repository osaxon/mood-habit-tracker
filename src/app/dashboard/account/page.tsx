import { cn } from "@/lib/utils";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Page() {
    return (
        <section className="@container bg-secondary p-4 w-full">
            <h2 className={cn("font-bold", spaceGrotesk.className)}>Account</h2>
        </section>
    );
}
