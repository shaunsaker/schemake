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
  if (userInvites.docs.length) {
    /*
     * Get the teamId from  the invite
     */
    const invite = userInvites.docs[0];
    const { teamId } = invite.data();

    /*
     * Get the team document
     */
    const teamRef = db.collection('teams').doc(teamId);
    const team = await teamRef.get();
    const { users } = team.data();

    /*
     * Add the users's uid to the team's user's field if it's not already present
     */
    if (!users.includes(uid)) {
      users.push(uid);

      /*
       * Update the team doc with the new users array
       */
      await teamRef.update({ users });

      console.log('User added to existing team successfully.');
    }

    return;
  } else {
    /*
     * New user with no invite
     * Create the team name using the user's name
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

    await db.collection('teams').add(document);

    console.log('User added to new team successfully.');

    return;
  }
});

module.exports = onUserAdded;
``;
