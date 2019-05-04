const functions = require('firebase-functions');
const admin = require('firebase-admin');

const onDeleteUser = functions.firestore.document('_deleteUsers/{uid}').onCreate((snapshot) => {
  admin.initializeApp({});

  const uid = snapshot.id;

  admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      console.log('Successfully deleted user');

      return null;
    })
    .catch((error) => {
      console.log('Error deleting user:', error);

      return error;
    });
});

module.exports = onDeleteUser;
``;
