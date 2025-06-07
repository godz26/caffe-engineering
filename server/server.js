// server.js
import express from "express";
import cors from "cors";
import sendEmailRoute from "./sendEmail.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Route
app.use("/sendEmail", sendEmailRoute); // 👈 POST to /sendEmail

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
