require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/authRouter");
const app = express();

const PORT = process.env.PORT;
// const MONGO_URL = process.env.MONGO_URL;
app.use(express.json());
// auth router use
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
