import nodemailer from "nodemailer";
import { google } from "googleapis";
import multer from "multer";
import nextConnect from "next-connect"; // or any middleware handler

const CLIENT_ID =
  "996422693850-f3pvrhtq24mti3km9ptraf5evqqrda5k.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04eQev2jWOKY-CgYIARAAGAQSNwF-L9IrQq6Sa6pSoCdF__lfT0POLv8lgskMm0an1ihTP2N7mRfGX0lX9kcJDRro5x-GOb1PGfU";

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
        user: "gestardo134@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `"Caffe Engineering" <gestardo134@gmail.com>`,
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
