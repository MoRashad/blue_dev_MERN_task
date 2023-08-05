import express from "express";
import config from "./config";
import connectToDb from "./helpers/dbConnection";
import userRoutes from "./routes/user.route";
import taskRoutes from "./routes/task.route";
import commentRoutes from "./routes/comment.route";
import { authenticateUser } from "./middleware/authinticate.middleware";
const PORT = (config.PORT || 3333) as number;

const app = express();
app.use(authenticateUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", commentRoutes);

connectToDb();

app.get("/", (req, res) => res.send("hello world"));
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
