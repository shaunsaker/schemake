const functions = require('firebase-functions');
const admin = require('firebase-admin');

const onSupportAdded = functions.firestore.document('_deleteUsers/{uid}').onCreate((snapshot) => {
  const uid = snapshot.id;

  admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      console.log('Successfully deleted user');

      return;
    })
    .catch((error) => {
      console.log('Error deleting user:', error);

      return;
    });
});

module.exports = onSupportAdded;
