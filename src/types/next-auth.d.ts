import "next-auth/jwt";
import "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth, {
    User,
    Session,
    DefaultSession,
    DefaultUser,
} from "next-auth";
import { UserRole } from "@prisma/client";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

interface IUser extends DefaultUser {
    id: string;
    role?: UserRole;
}

declare module "next-auth" {
    interface User extends IUser {}
    // interface Session {
    //     user: User;
    // }
    interface Session {
        user: {
            id: string;
            role?: UserRole;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends IUser {}
}
