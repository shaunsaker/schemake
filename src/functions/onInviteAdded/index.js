const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

const config = require('../config');

sgMail.setApiKey(config.sendGridAPIKey); // FIXME: Use .env

const onInviteAdded = functions.firestore.document('_invites/{inviteId}').onCreate((snapshot) => {
  const values = snapshot.data();
  const email = values.email;
  const teamId = values.teamId;
  const invitee = values.invitee;
  const mailOptions = {
    from: `${config.appName} <${config.appEmail}>`,
    to: email,
    templateId: config.templates.invite,
    dynamic_template_data: {
      Sender_Name: config.appName,
      Sender_Address: config.unsubscribe.address,
      Sender_City: config.unsubscribe.city,
      Sender_State: config.unsubscribe.state,
      Sender_Zip: config.unsubscribe.zip,
      subject: 'You were added to a team on schemake',
      invitee,
      schemakeLink: config.appLink,
      inviteLink: `${config.appLink}/signUp?teamId=${teamId}`,
    },
  };

  return sgMail
    .send(mailOptions)
    .then(() => console.log('Email sent successfully'))
    .catch((error) => console.log(error.message));
});

module.exports = onInviteAdded;
