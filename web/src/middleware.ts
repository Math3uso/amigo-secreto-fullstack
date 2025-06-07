import { NextRequest, NextResponse } from "next/server";

export default async function middlawe(req: NextRequest) {
    const token = req.cookies.get('accessToken');

    if (token) {
        return NextResponse.next();
    }
    console.log("token invalido");
    //console.log(token);
    return NextResponse.redirect(new URL('/auth', req.url));
}

export const config = {
    matcher: ['/app/:path*']
}