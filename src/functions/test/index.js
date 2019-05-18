const sendGrid = require('@sendgrid/mail');

const config = require('../config');

sendGrid.setApiKey(config.sendGridAPIKey); // FIXME: Use .env

const email = 'sakershaun@gmail.com';
const teamId = '12345678';
const invitee = 'Shaun';
const mail = {
  from: {
    name: 'Shaun',
    email: config.appEmail,
  },
  to: email,
  templateId: config.templates.invite,
  subject: `You were added to a team on ${config.appName}`,
  dynamicTemplateData: {
    Sender_Name: config.appName,
    Sender_Address: config.unsubscribe.address,
    Sender_City: config.unsubscribe.city,
    Sender_State: config.unsubscribe.state,
    Sender_Zip: config.unsubscribe.zip,
    invitee,
    schemakeLink: config.appLink,
    inviteLink: `${config.appLink}/signUp?teamId=${teamId}`,
  },
};

sendGrid
  .send(mail, false, (_, result) => console.log(result))
  .then(() => console.log('Email sent successfully'))
  .catch((error) => console.log(error.message));
