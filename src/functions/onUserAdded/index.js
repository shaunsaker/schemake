const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({});

const db = admin.firestore();

const onUserAdded = functions.firestore.document('users/{uid}').onCreate(async (snapshot) => {
  const { id: uid } = snapshot;
  const values = snapshot.data();
  const { email } = values;

  /*
   * Get the user's invites (if any)
   */
  const usersInvites = await db.collection('_invites').where('email', '==', email);

  /*
   * Does the user have invites?
   */
  if (userInvites.length) {
    // TODO:
  } else {
    /*
     * New user with no invite
     * Create the team name using the user's name
     */

    const { name } = values;
    const teamName = `${name}'s team`;

    /*
     * Create a new team with id === uid
     */
    const document = {
      name: teamName,
      createdBy: uid,
      dateCreated: Date.now(),
      users: [uid],
    };

    await db.collection('teams').addDocument(document);

    return 'User added to team successfully.';
  }
});

module.exports = onUserAdded;
``;
