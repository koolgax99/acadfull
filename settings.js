const nodemailer = require("nodemailer")

module.exports = {
    sender: "rhi260804@gmail.com",
    transporter: nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "rhi260804@gmail.com",
            pass: "Aparna@09"
        }
    })
}
