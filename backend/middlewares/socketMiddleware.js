const { io } = require("../config/socket");
const verifyUserFromToken = require("../utils/verifyTokenFromUser");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    const user = await verifyUserFromToken(token);

    socket.user = user;
    console.log("Authenticated user added to socket:", user);
    next();
  } catch (error) {
    console.error("Socket authentication error:", error);
    next(new Error("Unauthorized"));
  }
});
