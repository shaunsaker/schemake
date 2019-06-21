const functions = require('firebase-functions');

const admin = require('../firebase');

const db = admin.firestore();

const onDeleteUserAdded = functions.firestore
  .document('deleteUsers/{uid}')
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
    const usersTeamsDocs = await db
      .collection('teams')
      .where('createdBy', '==', uid)
      .get();

    usersTeamsDocs.forEach(async (teamDoc) => {
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

    /*
     * Remove the user from any teams that they are apart of
     */
    const teamsDocs = await db.collection('teams').where('users', 'array-contains', uid);

    teamsDocs.forEach(async (teamsDoc) => {
      const { id } = teamsDoc;

      await db
        .collection('teams')
        .doc(id)
        .update({ users: admin.firestore.FieldValue.arrayRemove(uid) });
    });
  });

module.exports = onDeleteUserAdded;
