import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ipRatelimit, globalRatelimit } from '@/lib/rate-limit';

export async function middleware(request: NextRequest) {
  // Use IP address as the identifier
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  // Per-IP limit
  const ipResult = await ipRatelimit.limit(ip);

  // Global limit
  const globalResult = await globalRatelimit.limit('global');

  // If either limit is exceeded, block the request
  if (!ipResult.success || !globalResult.success) {
    return new NextResponse('Rate limit exceeded', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': ipResult.limit.toString(),
        'X-RateLimit-Remaining': ipResult.remaining.toString(),
        'X-RateLimit-Reset': ipResult.reset.toString(),
        'X-GlobalRateLimit-Limit': globalResult.limit.toString(),
        'X-GlobalRateLimit-Remaining': globalResult.remaining.toString(),
        'X-GlobalRateLimit-Reset': globalResult.reset.toString(),
      },
    });
  }

  // Set rate limit headers on all responses
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', ipResult.limit.toString());
  response.headers.set('X-RateLimit-Remaining', ipResult.remaining.toString());
  response.headers.set('X-RateLimit-Reset', ipResult.reset.toString());
  response.headers.set('X-GlobalRateLimit-Limit', globalResult.limit.toString());
  response.headers.set('X-GlobalRateLimit-Remaining', globalResult.remaining.toString());
  response.headers.set('X-GlobalRateLimit-Reset', globalResult.reset.toString());
  return response;
}

export const config = {
  matcher: [
    // Match all routes except for static files, _next, favicon.ico
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
