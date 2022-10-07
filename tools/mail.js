


var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MT_USER,
    pass: process.env.MT_PASSWORD,
  },
});
