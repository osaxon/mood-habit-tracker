import { getSingleHabitDef } from "@/app/actions";
import { auth } from "@/libs/authconfig";
import { cn } from "@/libs/utils";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const habitDef = await getSingleHabitDef(id);
    const session = await auth();
    const userId = session?.user.id || "";
    console.log(habitDef);
    return (
        <section className="@container bg-secondary p-4 w-full">
            <h2 className={cn("font-bold", spaceGrotesk.className)}>Add</h2>
            <p>{id}</p>
            <div></div>
        </section>
    );
}
