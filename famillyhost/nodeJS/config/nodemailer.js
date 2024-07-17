const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const JWT_SECRET = process.env.JWT_SECRET;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(mailOptions) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USERNAME,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

async function sendVerificationEmail(user) {
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  const verificationLink = `http://localhost:${process.env.PORT}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: 'Email Verification',
    html: `<p>Please verify your email by clicking the link: <a href="${verificationLink}">Verify Email</a></p>`
  };

  try {
    await sendMail(mailOptions);
    user.verificationToken = token;
    await user.save();
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

module.exports = { sendMail, sendVerificationEmail };
