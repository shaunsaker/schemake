import React from 'react';

import { modals as modalsConfig } from '../../config';

import DeleteUserModal from '../../layouts/modals/DeleteUserModal';
import EditProfileModal from '../../layouts/modals/EditProfileModal';
import ForgotPasswordModal from '../../layouts/modals/ForgotPasswordModal';
import SendFeedbackModal from '../../layouts/modals/SendFeedbackModal';

const modals = [
  {
    key: modalsConfig.deleteUserModal.key,
    component: (props) => <DeleteUserModal {...props} />,
  },
  {
    key: modalsConfig.editProfileModal.key,
    component: (props) => <EditProfileModal {...props} />,
  },
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
