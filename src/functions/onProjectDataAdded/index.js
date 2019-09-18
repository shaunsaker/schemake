const functions = require('firebase-functions');

const admin = require('../firebase');

const db = admin.firestore();

const onProjectDataAdded = functions.firestore
  .document('projects/{projectId}/data/{dataId}')
  .onWrite(async (change, context) => {
    /*
     * Update dateModified and lastModifiedBy of the project
     */
    const { projectId } = context.params;
    const { dateModified, lastModifiedBy } = change.after.data();

    await db
      .collection('projects')
      .doc(projectId)
      .update({
        dateModified,
        lastModifiedBy,
      });

    console.log('Successfully updated dateModified of', { projectId });
  });

module.exports = onProjectDataAdded;
