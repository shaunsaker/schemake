const functions = require('firebase-functions');

const config = require('../config');
const sendEmail = require('../sendEmail');

const onInviteAdded = functions.firestore.document('_invites/{inviteId}').onCreate((snapshot) => {
  const values = snapshot.data();
  const { email, invitee } = values;
  const emailOptions = {
    from: `${config.appUsername} <${config.appEmail}>`,
    to: email,
    template: 'invite',
    locals: {
      invitee,
      appName: config.appName,
    },
  };

  return sendEmail(emailOptions);
});

module.exports = onInviteAdded;
