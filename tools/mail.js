
import nodemailer from 'nodemailer'

export const mailTransport = () => nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MT_USER,
    pass: process.env.MT_PASSWORD,
  },
});

let otp = "";
export const generateOTP = () => {
  for (let i = 0; i <= 3; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp = randVal + otp;
  }
  return otp;
};

