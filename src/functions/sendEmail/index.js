const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');

const sendEmail = ({ from, to, template, locals }) => {
  /*
   * Setup the transport
   */
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'sakershaun@gmail.com',
      pass: 'qltxqlosedozvmds', // FIXME: Use env file
    },
  };

  const transport = nodemailer.createTransport(smtpConfig);

  /*
   * Get the pathname
   */
  const root = path.join(__dirname, 'templates');

  /*
   * Create the email
   */
  const email = new Email({
    message: {
      from,
    },
    transport,
    views: {
      root,
    },
    send: false,
    juice: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(root, 'templates'),
      },
    },
  });

  /*
   * Create the email options
   */
  const emailOptions = {
    template,
    message: {
      to,
    },
    locals,
  };

  /*
   * Send the email
   */
  return email
    .send(emailOptions)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

module.exports = sendEmail;
