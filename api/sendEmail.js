import nodemailer from "nodemailer";
import { google } from "googleapis";
import multer from "multer";
import nextConnect from "next-connect"; // or any middleware handler

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Multer setup for file upload (Vercel serverless supports limited size uploads)
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Using next-connect for middleware support
const handler = nextConnect();

handler.use(upload.single("file"));

handler.post(async (req, res) => {
  try {
    const { name, email, gender, jobRole } = req.body;
    const file = req.file;

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_ADDRESS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `Caffe Engineering <${process.env.EMAIL_ADDRESS}>`,
      to: "gestardo143@gmail.com",
      subject: `New Job Application from ${name}`,
      html: `
        <h1>Application Details</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Job Role:</strong> ${jobRole}</p>
      `,
      attachments: file
        ? [{ filename: file.originalname, content: file.buffer }]
        : [],
    };

    await transport.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email Error:", error);
    res
      .status(500)
      .json({ message: "Email sending failed", error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false, // multer needs this disabled
  },
};

export default handler;
