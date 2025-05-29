// api/sendEmail.js
import multer from "multer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const upload = multer();

export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser to handle multipart/form-data
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Handle file upload using multer
    const uploadMiddleware = upload.single("file");

    uploadMiddleware(req, res, async (err) => {
      if (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ status: "error", message: err.message });
      }

      const { name, email, gender, jobRole } = req.body;
      const file = req.file;

      // Create transporter
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Prepare email
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

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent:", info.response);
      return res.status(200).json({ status: "success" });
    });
  } catch (error) {
    console.error("❌ Email error:", error);
    return res.status(500).json({ status: "error", message: error.message });
  }
}
