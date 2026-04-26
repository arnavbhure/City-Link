require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/authRouter");
const jwtRouter = require("./routes/jwtTokenVerificationRouter");
const app = express();
const cors = require("cors");
const verificationRouter = require("./routes/verificationRouter");
const completeProfileRouter = require("./routes/completeProfileRouter");
const sendingRoommateRouter = require("./routes/SendingRoommateRouter");
const sendNotificationToRoommateRouter = require("./routes/sendNotificationToRoommate");
const PostHouseListingRouter = require("./routes/PostHouseListingRouter");
const sendHouseListingsRouter = require("./routes/sendHouseListingsRouter");
const viewProfileRouter = require("./routes/viewprofileRouter");

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
