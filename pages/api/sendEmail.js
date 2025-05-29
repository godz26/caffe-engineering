import multer from "multer";
import nodemailer from "nodemailer";

const upload = multer();

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Handle file upload
    await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const { name, email, gender, jobRole } = req.body;
    const file = req.file;

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Caffe Engineering" <${process.env.EMAIL_USER}>`,
      to: "gestardo134@gmail.com",
      subject: `${jobRole} Application`,
      text: `Name: ${name}\nEmail: ${email}\nGender: ${gender}\nRole: ${jobRole}`,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    });

    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to send email",
    });
  }
}
