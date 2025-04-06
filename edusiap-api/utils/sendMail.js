const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

const sendVerificationMail = async (email, url) => {
    const mailOptions = {
        from: `"EduSiap" <${process.env.MAIL_FROM_ADDRESS}>`,
        to: `${email}`,
        subject: "Verify your Email",
        html: `
                <p>Click <a href="${url}">here</a> to verify your email.</p>
                <p>Expires in 1h</p>
                `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch(err) {
        console.error(err);
    }
}

module.exports = { sendVerificationMail };