import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler } from 'next';

export function withNextSession(apiRoute: NextApiHandler) {
  return withIronSessionApiRoute(apiRoute, {
    cookieName: 'user-session',
    password: process.env.SECRET_COOKIE_PASSWORD || '',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
