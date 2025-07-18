const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
// require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

//db connect
connectDB();

//routes
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/ping", (req, res) => {
  res.send("API Working...");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
