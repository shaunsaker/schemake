/*
 * Keyed by layout (page/modal) name
 * With a descriptive key name, ie. description
 */

const supportAndFeedbackDescription =
  "We value feedback so much. If you have any questions, suggestions for improvements or if you think you've found a bug, please let use know. We'd love to hear from you!";
const successTitle = 'Great success';
const supportAndFeedbackSuccess = 'Your message was submitted successfully.';
const success = {
  title: successTitle,
  description: supportAndFeedbackSuccess,
};

const copy = {
  feedback: {
    default: {
      description: supportAndFeedbackDescription,
    },
    success,
  },
  support: {
    default: {
      description: supportAndFeedbackDescription,
    },
    success,
  },
  dangerZone: {
    default: {
      description: 'Once you delete your user, there is no going back.',
    },
  },
};

export default copy;
