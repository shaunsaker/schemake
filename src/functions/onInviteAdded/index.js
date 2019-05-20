const functions = require('firebase-functions');
const sendGrid = require('@sendgrid/mail');

const config = require('../config');

sendGrid.setApiKey(config.sendGridAPIKey); // FIXME: Use .env

const onInviteAdded = functions.firestore.document('_invites/{inviteId}').onCreate((snapshot) => {
  const values = snapshot.data();
  const { email, teamId, invitee } = values;
  const mail = {
    from: {
      name: config.appName,
      email: config.appEmail,
    },
    to: email,
    templateId: config.templates.invite,
    dynamic_template_data: {
      Sender_Name: config.appName,
      Sender_Address: config.unsubscribe.address,
      Sender_City: config.unsubscribe.city,
      Sender_State: config.unsubscribe.state,
      Sender_Zip: config.unsubscribe.zip,
      subject: `You were added to a team on ${config.appName}`,
      invitee,
      schemakeLink: config.appLink,
      inviteLink: `${config.appLink}/signUp?teamId=${teamId}`,
    },
  };

  return sendGrid
    .send(mail)
    .then(() => console.log('Email sent successfully'))
    .catch((error) => console.log(error.message));
});

module.exports = onInviteAdded;
