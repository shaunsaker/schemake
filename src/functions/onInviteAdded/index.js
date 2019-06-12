const functions = require('firebase-functions');

const admin = require('../firebase');
const config = require('../config');
const sendEmail = require('../sendEmail');

const db = admin.firestore();

const onInviteAdded = functions.firestore
  .document('_invites/{inviteId}')
  .onCreate(async (snapshot) => {
    /*
     * Send the person their email invite
     */
    const values = snapshot.data();
    const { email, invitee } = values;
    const emailOptions = {
      from: `${config.appUsername} <${config.appEmail}>`,
      to: email,
      template: 'invite',
      locals: {
        invitee,
        appName: config.appName,
        appLink: config.appLink,
        signupLink: `${config.appLink}/signup`,
      },
    };

    await sendEmail(emailOptions);

    console.log('Email sent successfully', { email, invitee });

    /*
     * Check if the person is signed up already
     * If so, add them to the team directly
     */
    const users = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    const user = users.docs[0];

    if (user) {
      const { id: uid } = user;

      /*
       * Add the user's uid to the users field of the team doc
       */
      const { teamId } = values;
      const teamRef = db.collection('teams').doc(teamId);

      await teamRef.update({ users: admin.firestore.FieldValue.arrayUnion(uid) });

      console.log('User added to existing team successfully.', { uid, teamId });
    }
  });

module.exports = onInviteAdded;
