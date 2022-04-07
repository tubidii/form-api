const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: "apikey",
    pass: "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"
  }
})


const sendEmail = (message, onSuccess, onFail) => {
  // send mail with defined transport object
  transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log(err)
        onSuccess(err)
      } else {
        console.log(info)
        onFail(info);
      }
    }
  )
}

module.exports = sendEmail
