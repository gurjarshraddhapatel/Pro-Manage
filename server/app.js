const express = require("express");
const router = require("./routes/authRoutes");
const connectDb = require("./database/db");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const todoRouter = require("./routes/proManagaeRoutes");
connectDb();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("send");
});

app.use("/api/auth", router);
app.use("/api/promanage", todoRouter);
app.use("/api/users", userRouter);

app.listen(4000, () => {
  console.log("Server Is Running");
});
