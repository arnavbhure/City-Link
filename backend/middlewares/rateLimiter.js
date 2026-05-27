const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

const authLimiter = rateLimit({
  windowMs: 7 * 60 * 1000,
  max: 6,
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
});

const listingLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 5,
});

module.exports = {
  globalLimiter,
  authLimiter,
  chatLimiter,
  listingLimiter,
};
