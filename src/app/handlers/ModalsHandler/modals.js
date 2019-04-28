import React from 'react';

import { modals as modalsConfig } from '../../config';

import ForgotPasswordModal from '../../layouts/modals/ForgotPasswordModal';
import SendFeedbackModal from '../../layouts/modals/SendFeedbackModal';

const modals = [
  {
    key: modalsConfig.forgotPasswordModal.key,
    component: (props) => <ForgotPasswordModal {...props} />,
  },
  {
    key: modalsConfig.sendFeedbackModal.key,
    component: (props) => <SendFeedbackModal {...props} />,
  },
];

export default modals;
