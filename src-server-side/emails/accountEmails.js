const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

const genirateCode = () => {
  const verificationCode = `${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;

  return verificationCode;
};

const sendVerificationCodeToUser = (email, firstName, lastName, code) => {
  sgMail.setApiKey(sendgridAPIKey);

  sgMail
    .send({
      to: email,
      from: 'aqbaghi@atomiccode.uk',
      subject: 'Verification Code',
      text: `Hello ${firstName} ${lastName}, Your Verification code is: ${code}`,
    })
    .then(() => {
      console.log('Message sent');
    })
    .catch((error) => {
      console.log(error.response.body);
      // console.log(error.response.body.errors[0].message);
    });
};

module.exports = {
  sendVerificationCodeToUser,
  genirateCode,
};
