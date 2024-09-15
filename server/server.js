import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongodb.js";
import { server, app } from "./socket/socket.js";

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server on PORT http://localhost:${PORT}`);
});

//mongodb+srv://smimtiaz58:smimtiaz.0@demo.qqrxe7p.mongodb.net/
