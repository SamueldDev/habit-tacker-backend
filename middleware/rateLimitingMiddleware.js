
import rateLimit from "express-rate-limit";

//  Limit login/register to 5 per minute per IP
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3,
  message: "Too many attempts. Please try again in 1 minute.",
});

export default authLimiter

