const functions = require('firebase-functions');

const admin = require('../firebase');

const onDeleteUserAdded = functions.firestore
  .document('_deleteUsers/{uid}')
  .onCreate((snapshot) => {
    const { id: uid } = snapshot;

    admin
      .auth()
      .deleteUser(uid)
      .then(() => {
        console.log('Successfully deleted user', { uid });

        return null;
      })
      .catch((error) => {
        console.log('Error deleting user:', error, { uid });

        return error;
      });
  });

module.exports = onDeleteUserAdded;
