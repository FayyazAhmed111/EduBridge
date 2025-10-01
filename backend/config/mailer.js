import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve(__dirname, "../emails"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "../emails"),
  extName: ".hbs",
};

transporter.use("compile", hbs(handlebarOptions));

export const sendMail = async ({ to, subject, template, context, html }) => {
  return transporter.sendMail({
    from: `"EduBridge" <${process.env.MAIL_USER}>`,
    to,
    subject,
    ...(template
      ? { template, context } 
      : { html }),            
  });
};
