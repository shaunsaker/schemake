const admin = require('firebase-admin');

const serviceAccount = require('./credential.json');

const deleteAnonymousUsers = async () => {
  await admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://schemake.firebaseio.com',
  });

  admin
    .auth()
    .listUsers()
    .then((listUsersResult) => {
      listUsersResult.users.forEach(async (userRecord) => {
        const userRecordJSON = userRecord.toJSON();
        const isAnonymous = !userRecordJSON.email;

        if (isAnonymous) {
          const { uid } = userRecordJSON;

          await admin
            .auth()
            .deleteUser(uid)
            .then(() => console.log('Successfully deleted user'))
            .catch((error) => console.log(error));
        }
      });
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};

deleteAnonymousUsers();
