import nodemailer from "nodemailer";

const { HOST_NAME, HOST_SERVICE_PORT, HOST_EMAIL, AUTH_PASS } = process.env;

export const transporter = nodemailer.createTransport({
  host: HOST_NAME,
  port: Number(HOST_SERVICE_PORT) || 0,
  auth: {
    user: HOST_EMAIL,
    pass: AUTH_PASS,
  },
});
