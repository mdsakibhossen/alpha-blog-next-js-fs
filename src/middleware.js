import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/api/admin/:path*",
    ],
};

export default withAuth(
    async function middleware(req) {
        const url = req.nextUrl.pathname;
        const isAdmin = req?.nextauth?.token?.user?.isAdmin;

        if (url?.includes("/admin") && !isAdmin) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                if (!token) {
                    return false;
                }
            },
        },
    },
);