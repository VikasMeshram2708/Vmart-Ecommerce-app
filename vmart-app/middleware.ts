import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieValue = cookies().get('vMartAuth')?.value || '';

  const path = request.nextUrl.pathname;

  if (path === '/login' || path === '/signup') {
    if (cookieValue) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (path !== '/') {
    if (!cookieValue) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup'],
};
