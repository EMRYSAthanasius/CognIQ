import { NextResponse, type NextRequest } from 'next/server'
// import { updateSession } from '@/utils/supabase/middleware'

export default async function middleware(request: NextRequest) {
  console.log("Middleware hitting path:", request.nextUrl.pathname);
  // Bypass all supabase logic to test if 404 is caused by middleware redirects or missing pages
  // return await updateSession(request)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
}
