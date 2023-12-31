import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const applyMiddleware = (middleware: any) => {
  return (request: NextApiRequest, response: NextApiResponse) => {
    return new Promise((resolve, reject) => {
      middleware(request, response, (result: NextApiHandler) => {
        return result instanceof Error ? reject(result) : resolve(result);
      });
    });
  };
};

const getIP = (request: any): string =>
  request.ip ||
  request.headers['x-forwarded-for'] ||
  request.headers['x-real-ip'] ||
  request.connection.remoteAddress;

export const getRateLimitMiddlewares = ({
  limit = 15,
  windowMs = 60 * 1000,
  delayAfter = Math.round(20 / 2),
  delayMs = 1000,
} = {}) => {
  return [
    slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
    rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
  ];
};

const middlewares = getRateLimitMiddlewares();

async function applyRateLimit(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await Promise.all(
    middlewares.map(applyMiddleware).map((middleware) => {
      return middleware(request, response);
    })
  );
}

export default applyRateLimit;
