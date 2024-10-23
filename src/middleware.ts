import { auth } from '@/app/lib/auth';

const SIGNIN_URL = '/auth/signin';
const PUBLIC_URLS = [SIGNIN_URL, '/auth/signup'];

export default auth((req) => {
  if (!req.auth && !PUBLIC_URLS.includes(req.nextUrl.pathname)) {
    const newUrl = new URL(SIGNIN_URL, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth && req.nextUrl.pathname === SIGNIN_URL) {
    return Response.redirect(new URL('/', req.nextUrl.origin))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};