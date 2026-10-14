import express from "express";
import { matchRouter } from "./routes/matches.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Backend API" })
});

app.use("/matches", matchRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
