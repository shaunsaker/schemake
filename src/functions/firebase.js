const admin = require('firebase-admin');

const serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://schemake.firebaseio.com',
});

module.exports = admin;
