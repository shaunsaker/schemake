const functions = require('firebase-functions');

const admin = require('../firebase');

const db = admin.firestore();

const onUserAdded = functions.firestore.document('users/{uid}').onCreate(async (snapshot) => {
  const { id: uid } = snapshot;
  const values = snapshot.data();
  const { email } = values;

  /*
   * Get the user's invites (if any)
   * NOTE: email has to be defined for this to work
   */
  const userInvites = await db
    .collection('_invites')
    .where('email', '==', email)
    .get();

  /*
   * Does the user have invites?
   */
  if (userInvites.length) {
    // TODO:
    console.log('HERE');
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

    await db.collection('teams').add(document);

    return 'User added to team successfully.';
  }
});

module.exports = onUserAdded;
``;
