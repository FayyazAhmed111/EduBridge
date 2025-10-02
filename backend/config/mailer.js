import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465, // true only if using 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// DEBUG log to confirm config
console.log("📧 SMTP Config:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  from: process.env.SMTP_FROM,
});

// Path to email templates (directly inside /emails)
const templatesDir = path.resolve(__dirname, "../emails");
console.log("📂 Templates Path:", templatesDir);

// Attach handlebars
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: templatesDir,
      partialsDir: templatesDir,
      defaultLayout: false,
    },
    viewPath: templatesDir,
    extName: ".hbs",
  })
);

export const sendMail = async ({ to, subject, html, template, context }) => {
  const from = process.env.SMTP_FROM || `"EduBridge" <no-reply@edubridge.app>`;
  const mailOptions = { from, to, subject };

  if (template) {
    mailOptions.template = template;
    mailOptions.context = context || {};
  } else {
    mailOptions.html = html || "";
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    throw err;
  }
};
