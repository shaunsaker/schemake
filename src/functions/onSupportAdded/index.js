const functions = require('firebase-functions');
const sendGrid = require('@sendgrid/mail');

const config = require('../config');

sendGrid.setApiKey(config.sendGridAPIKey); // FIXME: Use .env

const onSupportAdded = functions.firestore.document('_support/{supportId}').onCreate((snapshot) => {
  const values = snapshot.data();
  const { name, email, message } = values;
  const mail = {
    from: {
      name: config.appName,
      email: config.appEmail,
    },
    to: config.appEmail,
    subject: 'New Support Item',
    text: message,
  };

  return sendGrid
    .send(mail)
    .then(() => console.log('Email sent successfully'))
    .catch((error) => console.log(error.message));
});

module.exports = onSupportAdded;
