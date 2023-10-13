import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import { getServerSession, type Session } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import GitHub from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";

const prisma = new PrismaClient();

export const config = {
    adapter: PrismaAdapter(prisma),
    theme: {
        logo: "/lotus-flower.png",
        colorScheme: "light",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

        async signIn({ user, account, profile, email }) {
            let isAllowedToSignIn = true;

            // a profile only exists once a user has succesfully logged in
            if (!profile && user.email) {
                const invitation = await prisma.invitations.findFirst({
                    where: { email: user.email, used: false },
                });

                // throw error if no invitation or if already used
                if (!invitation || invitation.used) {
                    isAllowedToSignIn = false;
                }

                // set the invitation status to used
                await prisma.invitations.update({
                    where: {
                        token: invitation?.token,
                    },
                    data: {
                        used: true,
                    },
                });
            }

            return isAllowedToSignIn;
        },
    },
} satisfies NextAuthConfig;

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
): Promise<Session | null> {
    return getServerSession(...args, config);
}

declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            NEXTAUTH_SECRET: string;

            AUTH_GITHUB_ID: string;
            AUTH_GITHUB_SECRET: string;

            EMAIL_FROM: string;
            EMAIL_SERVER_HOST: string;
            EMAIL_SERVER_PORT: string;
            EMAIL_SERVER_PASSWORD: string;
            EMAIL_SERVER_USER: string;
        }
    }
}

export class AuthenticationError extends Error {
    constructor(message = "Authentication failed") {
        super(message);
        this.name = "AuthenticationError";
    }
}
