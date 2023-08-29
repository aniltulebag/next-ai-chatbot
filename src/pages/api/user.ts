// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// API request limiting
import applyRateLimit from '@/lib/rateLimit';
import { withNextSession } from '@/lib/session';

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    await applyRateLimit(req, res);
  } catch {
    return res.status(429).send('Too many requests');
  }

  if (req.method === 'GET') {
    if (req.session.user) {
      return res.status(200).json({
        success: true,
        data: { message: req.session.user.uid },
        error: null,
      });
    } else {
      return res.status(200).json({
        success: false,
        data: null,
        error: { message: 'User uid not found!' },
      });
    }
  } else {
    return res.status(500).json({
      success: false,
      data: null,
      error: { message: 'Invalid Api Route' },
    });
  }
}

export default withNextSession(userRoute);
