import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer();

router.post("/send", upload.single("file"), async (req, res) => {
  const { name, email, gender, jobRole } = req.body;
  const file = req.file;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: {
      name: "Caffe Engineering",
      address: process.env.EMAIL_USER,
    },
    to: ["gestardo134@gmail.com"],
    subject: `${jobRole} Application`,
    text: `Application Details:\n\nName: ${name}\nEmail: ${email}\nGender: ${gender}\nRole: ${jobRole}`,
    attachments: file
      ? [
          {
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype,
          },
        ]
      : [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
