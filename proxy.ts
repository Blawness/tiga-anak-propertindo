import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Coming-soon gate disabled: let all requests pass through.
export function proxy(_request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|_next/data|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
    ],
};
