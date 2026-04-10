require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/authRouter");
const jwtRouter = require("./routes/jwtTokenVerificationRouter");
const app = express();
const cors = require("cors");
const verificationRouter = require("./routes/verificationRouter");
const completeProfileRouter = require("./routes/completeProfileRouter");
const sendingRoommateRouter = require("./routes/SendingRoommateRouter");

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
