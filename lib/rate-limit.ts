import { redis } from '@/lib/redis';
import { Ratelimit } from '@upstash/ratelimit';

// per-IP: 100 req/min
export const ipRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
});

// global: 1000 req/min
export const globalRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1000, '1 m'),
  analytics: true,
});
