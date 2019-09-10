import React from 'react';

import ActionFieldModal from '../../layouts/modals/ActionFieldModal';
import ActionTypeModal from '../../layouts/modals/ActionTypeModal';
import AddProjectModal from '../../layouts/modals/AddProjectModal';
import AddTeamMemberModal from '../../layouts/modals/AddTeamMemberModal';
import DeleteProjectModal from '../../layouts/modals/DeleteProjectModal';
import DeleteUserModal from '../../layouts/modals/DeleteUserModal';
import EditProjectModal from '../../layouts/modals/EditProjectModal';
import EditProfileModal from '../../layouts/modals/EditProfileModal';
import ForgotPasswordModal from '../../layouts/modals/ForgotPasswordModal';
import RemoveTeamMemberModal from '../../layouts/modals/RemoveTeamMemberModal';
import ShareProjectModal from '../../layouts/modals/ShareProjectModal';

const modals = [
  {
    key: 'actionFieldModal',
    component: (props) => <ActionFieldModal {...props} />,
  },
  {
    key: 'actionTypeModal',
    component: (props) => <ActionTypeModal {...props} />,
  },
  {
    key: 'addProjectModal',
    component: (props) => <AddProjectModal {...props} />,
  },
  {
    key: 'addTeamMemberModal',
    component: (props) => <AddTeamMemberModal {...props} />,
  },
  {
    key: 'deleteProjectModal',
    component: (props) => <DeleteProjectModal {...props} />,
  },
  {
    key: 'deleteUserModal',
    component: (props) => <DeleteUserModal {...props} />,
  },
  {
    key: 'editProjectModal',
    component: (props) => <EditProjectModal {...props} />,
  },
  {
    key: 'editProfileModal',
    component: (props) => <EditProfileModal {...props} />,
  },
  {
    key: 'forgotPasswordModal',
    component: (props) => <ForgotPasswordModal {...props} />,
  },
  {
    key: 'removeTeamMemberModal',
    component: (props) => <RemoveTeamMemberModal {...props} />,
  },
  {
    key: 'shareProjectModal',
    component: (props) => <ShareProjectModal {...props} />,
  },
];

export default modals;
