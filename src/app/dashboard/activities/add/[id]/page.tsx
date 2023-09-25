import { auth } from "@/app/lib/authconfig";
import { AddHabitForm } from "@/components/forms/AddHabitForm";
import { cn } from "@/lib/utils";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const session = await auth();
    const userId = session?.user.id || "";
    return (
        <section className="@container bg-secondary p-4 w-full">
            <h2 className={cn("font-bold", spaceGrotesk.className)}>Add</h2>
            <p>{id}</p>
            <div>
                <AddHabitForm id={id} userId={userId} />
            </div>
        </section>
    );
}
