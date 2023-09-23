import "next-auth/jwt";
import "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth, { User, Session, DefaultSession } from "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** The user's role. */
        userRole?: string;
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            role?: string;
        } & DefaultSession["user"];
    }
}
