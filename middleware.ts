import { verifyToken } from '@/utils/verify-token'
import { NextRequest, NextResponse } from 'next/server'

const privatePaths = ['/dashboard', '/admin', '/profile']
const authPaths = ['/login', '/register']

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value ?? '';
    const isVerify = verifyToken(token);
    const { pathname } = req.nextUrl

    // Nếu user chưa đăng nhập và cố vào trang bảo mật -> Chuyển hướng về login
    if (privatePaths.some(path => pathname.startsWith(path)) && !isVerify) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // Nếu user đã đăng nhập và cố vào trang login/register -> Chuyển hướng về dashboard
    if (authPaths.includes(pathname) && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/profile/:path*', '/login', '/register'],
}