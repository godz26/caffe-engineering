// File: src/api/sendEmail.js

import multer from "multer";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import nextConnect from "next-connect";
import fs from "fs";
import path from "path";

// Google OAuth2 credentials
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

const upload = multer({ dest: "/tmp" });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  try {
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

    const { name, email, gender, jobRole } = req.body;
    const file = req.file;

    const mailOptions = {
      from: `Caffee Engineering <gestardo134@gmail.com>`,
      to: "gestardo143@gmail.com",
      subject: `New Job Application from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Gender: ${gender}
        Job Role: ${jobRole}
      `,
      html: `
        <h1>New Application</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Job Role:</strong> ${jobRole}</p>
      `,
      attachments: file
        ? [
            {
              filename: file.originalname,
              path: file.path,
            },
          ]
        : [],
    };

    const result = await transport.sendMail(mailOptions);

    // Clean up file after sending
    if (file) fs.unlinkSync(file.path);

    res.status(200).json({ message: "Email sent successfully", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
