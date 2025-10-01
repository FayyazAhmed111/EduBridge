import rateLimit from "express-rate-limit";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Basic IP rate limit (per route), adjust as needed
export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,  // 10 minutes
  max: 50,                   // 50 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
});

// Per email brute-force (fine-grained)
const limiter = new RateLimiterMemory({
  points: 5,        // 5 attempts
  duration: 10*60,  // per 10 min
});
export const checkBruteforce = async (req, res, next) => {
  const email = (req.body?.email || "").toLowerCase();
  if (!email) return next();
  try {
    await limiter.consume(email);
    return next();
  } catch {
    return res.status(429).json({ message: "Too many attempts. Try again later." });
  }
};
