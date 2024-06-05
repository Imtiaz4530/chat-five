import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongodb.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // to parsing the request with json payload!
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server on PORT http://localhost:${PORT}`);
});

//mongodb+srv://smimtiaz58:smimtiaz.0@demo.qqrxe7p.mongodb.net/
