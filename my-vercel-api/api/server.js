// api/sendEmail.js

import { sendEmail } from "../src/components/sendEmail.js"; // adjust path if needed

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const result = await sendEmail(req.body); // your existing logic
      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ success: false, error: "Failed to send email" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
