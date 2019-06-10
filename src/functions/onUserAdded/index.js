const functions = require('firebase-functions');

const admin = require('../firebase');
const autoId = require('./autoId');

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
  if (userInvites.docs.length) {
    /*
     * Get the teamId from  the invite
     */
    const invite = userInvites.docs[0];
    const { teamId } = invite.data();

    /*
     * Add the user's uid to the users field of the team doc
     */
    const teamRef = db.collection('teams').doc(teamId);

    await teamRef.update({ users: admin.firestore.FieldValue.arrayUnion(uid) });

    console.log('User added to existing team successfully.');

    /*
     * Add the teamId to the teams field of the user doc
     */
    const userRef = db.collection('users').doc(uid);

    await userRef.update({ teams: admin.firestore.FieldValue.arrayUnion(teamId) });

    console.log('Team added to existing user successfully.');

    return;
  } else {
    /*
     * New user with no invite
     * Create the team name using the user's name
     * Add a new field, teams with the teamId, to the user's document
     */

    const { name } = values;
    const teamName = `${name}'s team`;

    /*
     * Create a new team
     */
    const document = {
      name: teamName,
      createdBy: uid,
      dateCreated: Date.now(),
      users: [uid],
    };
    const teamId = autoId();
    const teamRef = db.collection('teams').doc(teamId);

    await teamRef.set(document);

    console.log('User added to new team successfully.');

    /*
     * Add the teamId to the teams field of the user doc
     */
    const userRef = db.collection('users').doc(uid);

    await userRef.update({ teams: admin.firestore.FieldValue.arrayUnion(teamId) });

    console.log('Team added to existing user successfully.');

    return;
  }
});

module.exports = onUserAdded;
``;
