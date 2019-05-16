const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

const config = require('../config');

sgMail.setApiKey(config.sendGridAPIKey); // FIXME: Use .env

const onSupportAdded = functions.firestore.document('_support/{supportId}').onCreate((snapshot) => {
  const values = snapshot.data();
  const mailOptions = {
    from: `${values.name} <${values.email}>`,
    to: config.appEmail,
    subject: 'New Support Item',
    text: values.message,
  };

  return sgMail
    .send(mailOptions)
    .then(() => console.log('Email sent successfully'))
    .catch((error) => console.log(error.message));
});

module.exports = onSupportAdded;
