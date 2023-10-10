// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
    const { pathname } = request.nextUrl;

    const adminPaths = ["/admin"];
    const protectedPaths = [...adminPaths, "/dashboard"];

    const matchesAdminPaths = adminPaths.some((path) =>
        pathname.startsWith(path)
    );

    const matchesProtectedPaths = protectedPaths.some((path) =>
        pathname.startsWith(path)
    );

    if (matchesProtectedPaths) {
        const token = await getToken({ req: request });

        if (!token) {
            const url = new URL(`/api/auth/signin`, request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }

        if (matchesAdminPaths && token.role !== UserRole.ADMIN) {
            const url = new URL(`/403`, request.url);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}
