const functions = require('firebase-functions');

const config = require('../config');
const sendEmail = require('../sendEmail');

const emailOptions = {
  from: `${config.appUsername} <${config.appEmail}>`,
  to: 'sakershaun@gmail.com',
  template: 'invite',
  locals: {
    invitee: 'Shaun Saker',
    appLink: config.appLink,
    signupLink: `${config.appLink}/signup`,
  },
};

return sendEmail(emailOptions);
