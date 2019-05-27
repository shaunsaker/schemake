const functions = require('firebase-functions');

const config = require('../config');
const sendEmail = require('../sendEmail');

const onSupportAdded = functions.firestore.document('_support/{supportId}').onCreate((snapshot) => {
  const values = snapshot.data();
  const { name, email, message } = values;

  return null;
});

module.exports = onSupportAdded;
