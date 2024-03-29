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
  const output = otp;
  otp = "";
  return output;
};

export const mailTransport = ({ OTP, result }) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2022roomhunt@gmail.com",
      pass: "ylxygweqkfbucacm",
    },
  });

  let mailDetails = {
    from: "roomhunt@gmail.com",
    to: `${result.email}`,
    subject: "OTP",
    html: `<h1>${OTP}</h1>`,
  };

  return mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};

export const mailVerified = (email) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2022roomhunt@gmail.com",
      pass: "ylxygweqkfbucacm",
    },
  });

  let mailDetails = {
    from: "2022roomhunt@gmail.com",
    to: `${email}`,
    subject: "OTP",
    html: `<h1>Email Verified Successfully</h1>`,
  };

  return mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};

export const mailPassReset = (email) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2022roomhunt@gmail.com",
      pass: "ylxygweqkfbucacm",
    },
  });

  let mailDetails = {
    from: "2022roomhunt@gmail.com",
    to: `${email}`,
    subject: "Reset Ok",
    html: `<h1>Email Password Reset Successfully</h1>`,
  };

  return mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};

export const accVerified = (email) => {
  console.log(email);
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2022roomhunt@gmail.com",
      pass: "ylxygweqkfbucacm",
    },
  });

  let mailDetails = {
    from: "2022roomhunt@gmail.com",
    to: `${email}`,
    subject: "OTP",
    html: `<h1>Account Verified Successfully 
     <br> <h3>Please Log-out, and Log-in again to apply changes </h3
      </h1>`,
  };

  return mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};
