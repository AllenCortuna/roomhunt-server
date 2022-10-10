import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import accommodatorRoutes from "./routes/accommodator.js";
import roomRoutes from "./routes/room.js";
const app = express();
// dotenv.config({path: 'ENV_FILENAME'});
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use('/accommodation', accommodationRoutes);
app.use("/accommodator", accommodatorRoutes);
app.use("/rooms", roomRoutes);

app.get("/", (res) => {
  res.send("Hello to Room hunt API");
});

const PORT = process.env.PORT || 8000;

mongoose
  // .connect(process.env.CONNECTION_URL, {
  .connect(
    "mongodb+srv://admin:qMwWh0Kgn7kusDoH@cluster0.eiwwj.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
