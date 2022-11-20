import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import roomRoutes from "./routes/room.js";
import clientRoutes from "./routes/client.js";
import resetRoutes from "./routes/reset.js";
import messageRoutes from "./routes/message.js";
import accommodatorRoutes from "./routes/accommodator.js";
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/accommodator", accommodatorRoutes);
app.use("/client", clientRoutes);
app.use("/room", roomRoutes);
app.use("/reset", resetRoutes);
app.use("/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Room hunt API");
});

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

