const config = require('../config');
const sendEmail = require('../sendEmail');

const emailOptions = {
  from: `${config.appUsername} <${config.appEmail}>`,
  to: 'sakershaun@gmail.com',
  template: 'support',
  locals: {
    name: 'Shaun Saker',
    email: 'sakershaun@gmail.com',
    message: 'Hi',
    appName: 'schemake',
  },
};

return sendEmail(emailOptions);
