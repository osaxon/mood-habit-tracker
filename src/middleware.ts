// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
    const { pathname } = request.nextUrl;

    const adminPaths = ["/admin"];

    // all paths should be protected
    const protectedPaths = [...adminPaths, "/dashboard"];

    // check if current path is in the admin paths array
    const matchesAdminPaths = adminPaths.some((path) =>
        pathname.startsWith(path)
    );

    // check if current path is protected
    const matchesProtectedPaths = protectedPaths.some((path) =>
        pathname.startsWith(path)
    );

    if (matchesProtectedPaths) {
        // get the JWT
        const token = await getToken({ req: request });

        // redirect to sign in if user is not logged in
        if (!token) {
            const url = new URL(`/api/auth/signin`, request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }

        // redirect to error page if attempting to view admin route as non-admin user
        if (matchesAdminPaths && token.role !== UserRole.ADMIN) {
            const url = new URL(`/403`, request.url);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}
