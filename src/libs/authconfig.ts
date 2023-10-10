import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import { getServerSession } from "next-auth";

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
    },
} satisfies NextAuthConfig;

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
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
