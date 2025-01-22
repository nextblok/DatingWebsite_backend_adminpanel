const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'illradoicic@gmail.com',
//         pass: 'IliupAfree213'
//     }
// });


const transporter = nodemailer.createTransport({
    host: 'smtp-broadcasts.postmarkapp.com', // Replace with your SMTP server host
    port: 587, // Replace with your SMTP server port
    secure: false, // true for 465, false for other ports
    auth: {
        user: '8f9d269e-3a1a-407a-9a00-23ff6b4ba474',
        pass: '8f9d269e-3a1a-407a-9a00-23ff6b4ba474'
    }
});

exports.signup = async (email) => {
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

exports.signin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Here you would normally check the user's credentials
    // For simplicity, we are just sending a response

    return res.status(200).json({ message: 'Signin successful' });
};

exports.sendEmail = (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email' });
        } else {
            return res.status(200).json({ message: 'Email sent successfully' });
        }
    });
};
