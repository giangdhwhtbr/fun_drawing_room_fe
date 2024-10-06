import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decodeJwt } from 'jose'

// 1. Specify protected and public routes
const publicRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/activate', '/']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = cookies().get('Authorization')?.value
    const session = cookie ? decodeJwt(cookie) : null

    if (!isPublicRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/auth/sign-in', req.nextUrl))
    }

    if (
        isPublicRoute &&
        session?.userId
    ) {
        return NextResponse.redirect(new URL('/rooms', req.nextUrl))
    }
    return NextResponse.next()
}

// Routes Middleware should not run on
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }
export const config = {
    matcher: [
        '/',
        '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.[a-z]+$).*)',
    ],
};
