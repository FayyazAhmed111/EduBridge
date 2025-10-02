import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// DEBUG log to confirm
console.log("📧 SMTP Config:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  from: process.env.SMTP_FROM
});

transporter.use("compile", hbs({
  viewEngine: {
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "..", "emails", "templates"),
    defaultLayout: false,
    partialsDir: path.join(__dirname, "..", "emails", "templates")
  },
  viewPath: path.join(__dirname, "..", "emails", "templates"),
  extName: ".hbs"
}));

export const sendMail = async ({ to, subject, html, template, context }) => {
  const from = process.env.SMTP_FROM || `"EduBridge" <no-reply@edubridge.app>`;
  const mailOptions = { from, to, subject };

  if (template) {
    mailOptions.template = template;
    mailOptions.context = context || {};
  } else {
    mailOptions.html = html || "";
  }

  return transporter.sendMail(mailOptions);
};
