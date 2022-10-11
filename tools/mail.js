import nodemailer from "nodemailer";

// export const mailTransport = () => nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: process.env.MT_USER,
//     pass: process.env.MT_PASSWORD,
//   },
// });

let otp = "";
export const generateOTP = () => {
  for (let i = 0; i <= 3; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp = randVal + otp;
  }
  return otp;
};

export const mailTransport = () =>
  nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "olsencortuna@gmail.com",
      pass: "yeopsbeprvyefdvt",
    },
  });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };
//
// mailTransport.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
