const crypto = require("crypto");

const buildBase64Url = (value) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

const sign = (value, secret) =>
  crypto.createHmac("sha256", secret).update(value).digest("base64url");

const createAuthToken = (user) => {
  const secret = process.env.AUTH_SECRET;
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: user.id,
    email: user.email,
    exp: expiresAt,
  };
  const encodedHeader = buildBase64Url(header);
  const encodedPayload = buildBase64Url(payload);
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = sign(unsignedToken, secret);

  return {
    token: `${unsignedToken}.${signature}`,
    expiresAt,
  };
};

module.exports = { createAuthToken };
