const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
});

const listingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
});

module.exports = {
  globalLimiter,
  authLimiter,
  chatLimiter,
  listingLimiter,
};
