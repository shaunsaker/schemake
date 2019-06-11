const functions = require('firebase-functions');

const config = require('../config');
const sendEmail = require('../sendEmail');

const onSupportAdded = functions.firestore
  .document('_support/{supportId}')
  .onCreate(async (snapshot) => {
    const values = snapshot.data();
    const { name, email, message } = values;
    const emailOptions = {
      from: `${config.appUsername} <${config.appEmail}>`,
      to: config.appEmail,
      template: 'support',
      locals: {
        name,
        email,
        message,
        appName: config.appName,
      },
    };

    await sendEmail(emailOptions);

    console.log('Email sent successfully', { email });
  });

module.exports = onSupportAdded;
