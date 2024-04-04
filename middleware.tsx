import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const username = request.cookies.get('username')?.value
  
  if (!username) return NextResponse.redirect(new URL('/', request.url))

  return NextResponse.next();
}
 
export const config = {
  matcher: '/events/:path*',
}