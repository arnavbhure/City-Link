const verifyUserFromToken = require("../utils/verifyTokenFromUser");

const getCookieValue = (cookieHeader, cookieName) => {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const targetCookie = cookies.find((cookie) =>
    cookie.startsWith(`${cookieName}=`),
  );

  if (!targetCookie) return null;

  return decodeURIComponent(targetCookie.slice(cookieName.length + 1));
};

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      getCookieValue(socket.handshake.headers.cookie, "token");

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const user = await verifyUserFromToken(token);

    socket.user = user;

    next();
  } catch (error) {
    console.error("Socket authentication error:", error);

    next(new Error("Unauthorized"));
  }
};

module.exports = { socketAuthMiddleware };
