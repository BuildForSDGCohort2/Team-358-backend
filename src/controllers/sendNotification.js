const nodemailer = require('nodemailer');
const {PASSWORD, EMAIL_ADDRESS} = require('../config/config');
// const testEmail = 'laryhug209@yahoo.com';
const testEmail = 'oluwaferanmiadetunji@gmail.com';

module.exports = (req, res) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: EMAIL_ADDRESS,
			pass: PASSWORD,
		},
	});

	const mailOptions = {
		from: EMAIL_ADDRESS,
		to: testEmail,
		subject: 'Security Alert',
		html: `<h2 style="color: black;">Security Alert</h2>
      <p style="color: black;">An unusual activity has been detected on your premises. </p>
      <p style="color: black;">Check your security app for more details</p>
      <p style="color: black;">Thanks</p>`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			return res.status(500).json({
				status: 'error',
				message: 'Something went wrong!',
				data: '',
			});
		}
		if (info) {
			console.log(info);
			return res.status(200).json({
				status: 'ok',
				message: 'Notification sent!',
				data: '',
			});
		}
	});
};
