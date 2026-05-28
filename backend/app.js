const express = require("express");
const authRouter = require("./routes/authRouter");
const jwtRouter = require("./routes/jwtTokenVerificationRouter");
const { app, server, io } = require("./config/socket");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const verificationRouter = require("./routes/verificationRouter");
const completeProfileRouter = require("./routes/completeProfileRouter");
const sendingRoommateRouter = require("./routes/SendingRoommateRouter");
const sendNotificationToRoommateRouter = require("./routes/sendNotificationToRoommate");
const PostHouseListingRouter = require("./routes/PostHouseListingRouter");
const sendHouseListingsRouter = require("./routes/sendHouseListingsRouter");
const viewProfileRouter = require("./routes/viewprofileRouter");
const contactUsRouter = require("./routes/contactUsRouter");
const editProfileRouter = require("./routes/editProfileRouter");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { socketAuthMiddleware } = require("./middlewares/socketMiddleware");
const chatRouter = require("./routes/chat/chatRouter");

dotenv.config();

app.use(cors(corsOptions));

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

io.use(socketAuthMiddleware);

app.set("trust proxy", 1);

// auth router use
app.use("/api/auth", authRouter);
app.use("/api/auth", jwtRouter);

// Email verification router
app.use("/api", verificationRouter);

// Router for completing user profile
app.use("/api", completeProfileRouter);

// router for getting roommates list
app.use("/api", sendingRoommateRouter);

// router for sending notification after roomate matching
app.use("/api", sendNotificationToRoommateRouter);

//router for posting house listing
app.use("/api", PostHouseListingRouter);

// router for getting house listings
app.use("/api", sendHouseListingsRouter);

// router for viewing user profile
app.use("/api", viewProfileRouter);

// router for editing user profile
app.use("/api", editProfileRouter);

// router for chat
app.use("/api", chatRouter);

//router for contact us form
app.use("/api", contactUsRouter);

// to keep server running
app.get("/ping", (req, res) => {
  return res.send("OK");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
