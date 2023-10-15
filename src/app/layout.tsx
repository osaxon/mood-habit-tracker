import NavMenu from "@/components/NavMenu";
import SessionProvider from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { auth } from "../libs/authconfig";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    console.log(session);
    return (
        <html lang="en">
            <SessionProvider session={session}>
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                    >
                        <main>
                            <NavMenu />
                            {children}
                        </main>
                        <Toaster />
                    </ThemeProvider>
                </body>
            </SessionProvider>
        </html>
    );
}
