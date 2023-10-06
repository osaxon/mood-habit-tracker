import Container from "@/components/container";
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
        <Container as="section" height="page">
            {children}
        </Container>
    );
}
