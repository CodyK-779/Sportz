import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Backend API" })
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})