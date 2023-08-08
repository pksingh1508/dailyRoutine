// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

exports.mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from: "Pawan Kumar || Daily Routine",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })
        // console.log(info);
        return info;
    } catch (err) {
        console.log("Error sending mail");
    }
}