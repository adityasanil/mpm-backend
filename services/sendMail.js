const nodemailer = require("nodemailer");
const config = require("config");

async function main(recepient, email, password) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.get("mailAccount"),
      pass: config.get("mailAccountPassword")
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const messageBody =
    "<h3>Welcome aboard!</h3><p>Below are your credentials to log in:</p><p><b>Email:</b> " +
    email +
    " </p><p><b>Password:</b> " +
    password +
    "</p><p>Do not share them with anyone.</p>";

  let info = {
    from: '"Maheshwari Samaj" ' + config.get("mailAccount"),
    to: recepient,
    subject: "Welcome to Maheshwari Samaj 🙏🏻",
    html: messageBody
  };

  await transporter.sendMail(info, (err, info) => {
    if (err) {
      return console.log(err);
    }
    // console.log("Message sent!");
    // console.log(info);
  });
}

// main("aditya.sanil@somaiya.edu", "aditya.sanil@somaiya.edu", "12333");

exports.main = main;
