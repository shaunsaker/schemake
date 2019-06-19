import React from 'react';

import { modals as modalsConfig } from '../../config';

import ActionProjectModal from '../../layouts/modals/ActionProjectModal';
import AddTeamMemberModal from '../../layouts/modals/AddTeamMemberModal';
import DeleteUserModal from '../../layouts/modals/DeleteUserModal';
import EditProfileModal from '../../layouts/modals/EditProfileModal';
import ForgotPasswordModal from '../../layouts/modals/ForgotPasswordModal';
import RemoveTeamMemberModal from '../../layouts/modals/RemoveTeamMemberModal';

const modals = [
  {
    key: modalsConfig.actionProjectModal.key,
    component: (props) => <ActionProjectModal {...props} />,
  },
  {
    key: modalsConfig.addTeamMemberModal.key,
    component: (props) => <AddTeamMemberModal {...props} />,
  },
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
    key: modalsConfig.removeTeamMemberModal.key,
    component: (props) => <RemoveTeamMemberModal {...props} />,
  },
];

export default modals;
