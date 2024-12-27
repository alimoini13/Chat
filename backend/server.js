import http from "http";
import path from "path";
import { Server } from "socket.io";
import express from "express";
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config()
//mongodb
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Mongodb Connected...'))
  .catch((err) => console.log(err));
//build
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

const httpServer = http.Server(app);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});