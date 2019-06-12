const functions = require('firebase-functions');

const admin = require('../firebase');

const db = admin.firestore();

const onDeleteUserAdded = functions.firestore
  .document('_deleteUsers/{uid}')
  .onCreate(async (snapshot) => {
    const { id: uid } = snapshot;
    /*
     * Delete the auth user
     */
    await admin.auth().deleteUser(uid);

    console.log('Successfully deleted user account', { uid });

    /*
     * Delete the user's data
     */
    await db
      .collection('users')
      .doc(uid)
      .delete();

    console.log('Successfully deleted user data', { uid });

    /*
     * Delete the user's teams data
     */
    const teamsDocs = await db
      .collection('teams')
      .where('createdBy', '==', uid)
      .get();

    teamsDocs.forEach(async (teamDoc) => {
      const { id } = teamDoc;

      await db
        .collection('teams')
        .doc(id)
        .delete();
    });

    console.log('Successfully deleted teams data', { uid });

    /*
     * Delete the user's projects data
     */
    const projectsDocs = await db
      .collection('projects')
      .where('createdBy', '==', uid)
      .get();

    projectsDocs.forEach(async (projectDoc) => {
      const { id } = projectDoc;

      await db
        .collection('projects')
        .doc(id)
        .delete();
    });

    console.log('Successfully deleted projects data', { uid });
  });

module.exports = onDeleteUserAdded;
