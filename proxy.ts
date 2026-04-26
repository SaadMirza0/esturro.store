import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Identify Protected Routes
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin-login';


  // - Prevent unauthorized access to viewing all orders
  const isProtectedOrdersGET = pathname.startsWith('/api/Orders') && request.method === 'GET';
  // - Prevent unauthorized adding of products
  const isProtectedProductsPOST = pathname.startsWith('/api/Products') && request.method === 'POST';

  const isProtectedApiRoute = isProtectedOrdersGET || isProtectedProductsPOST;

  if (isAdminRoute || isProtectedApiRoute) {
    // 2. Check for the session cookie
    const cookie = request.cookies.get('admin_session')?.value;

    if (!cookie) {
      if (isProtectedApiRoute) {
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }

    // 3. Verify the JWT
    const payload = await decrypt(cookie);

    if (!payload || !payload.isAdmin) {
      // Token is invalid or expired
      const response = isProtectedApiRoute
        ? NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 })
        : NextResponse.redirect(new URL('/admin-login', request.url));

      // Clear invalid cookie
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Allow the request to proceed if not protected or if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, public folder contents
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
