const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org', // Replace with your SMTP server host
    port: 587, // Replace with your SMTP server port
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'postmaster@sandbox015756b4c7cd400fbc4b737d1a87bdaa.mailgun.org',
        pass: 'ProjectLegacy01Alpha1'
    }
});

exports.signupEmail = async (email) => {
    try {
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Signup Successful',
            text: 'You have successfully signed up!'
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            return { message: 'Signup successful, email sent' };
        } catch (error) {
            return { message: 'Error sending email', err: error.message };
        }

    } catch (error) {
        console.log(error.message)
        return { message: 'wow Error sending email', err: error.message };
    }
};
