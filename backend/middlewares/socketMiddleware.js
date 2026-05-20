const verifyUserFromToken = require("../utils/verifyTokenFromUser");

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

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
