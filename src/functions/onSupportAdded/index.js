const functions = require('firebase-functions');

const config = require('../config');
const sendEmail = require('../sendEmail');

const onSupportAdded = functions.firestore.document('_support/{supportId}').onCreate((snapshot) => {
  const values = snapshot.data();
  const { name, email, message } = values;
  const emailOptions = {
    from: `${config.appUsername} <${config.appEmail}>`,
    to: email,
    template: 'support',
    locals: {
      name,
      email,
      message,
      appName: config.appName,
    },
  };

  return sendEmail(emailOptions);
});

module.exports = onSupportAdded;
