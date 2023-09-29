import { auth } from "@/libs/authconfig";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    return (
        <main className="max-w-7xl mx-auto py-12 space-y-6 px-4">
            {children}
        </main>
    );
}
