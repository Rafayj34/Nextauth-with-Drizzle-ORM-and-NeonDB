import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    // Get the token from the request
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If the token exists, allow the request to proceed
    if (token) {
        return NextResponse.next();
    }

    // If the token does not exist, redirect to the login page
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
}

// Specify the paths that should be protected
export const config = {
    matcher: '/((?!api/auth).*)', // Protect all routes except the auth routes
};
