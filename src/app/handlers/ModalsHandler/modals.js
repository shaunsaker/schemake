import React from 'react';

import { modals as modalsConfig } from '../../config';

import AddTeamMemberModal from '../../layouts/modals/AddTeamMemberModal';
import DeleteProjectModal from '../../layouts/modals/DeleteProjectModal';
import DeleteUserModal from '../../layouts/modals/DeleteUserModal';
import EditProfileModal from '../../layouts/modals/EditProfileModal';
import ForgotPasswordModal from '../../layouts/modals/ForgotPasswordModal';
import RemoveTeamMemberModal from '../../layouts/modals/RemoveTeamMemberModal';

const modals = [
  {
    key: modalsConfig.addTeamMemberModal.key,
    component: (props) => <AddTeamMemberModal {...props} />,
  },
  {
    key: modalsConfig.deleteProjectModal.key,
    component: (props) => <DeleteProjectModal {...props} />,
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
