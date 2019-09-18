import React, { memo } from 'react';
import PropTypes from 'prop-types';

import fields from './fields';

import Modal from '../../../components/Modal';

const AddTeamMemberModal = ({
  isOpen,
  hasSuccess,
  email,
  isDisabled,
  handleClose,
  handleSubmit,
}) => {
  let title = 'Add Team Member';
  let description =
    "Add your team member's email address and we'll send them a link to join your team.";
  let form = {
    fields,
    disabled: isDisabled,
    handleSubmit,
  };

  if (hasSuccess) {
    title = 'Great Success.';
    description = `We'll send an invite to ${email}, inviting them to your team shortly.`;
    form = null;
  }

  return (
    <Modal
      title={title}
      description={description}
      form={form}
      isOpen={isOpen}
      disabled={isDisabled}
      handleClose={handleClose}
    />
  );
};

AddTeamMemberModal.propTypes = {
  isOpen: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  email: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
AddTeamMemberModal.defaultProps = {};

export default memo(AddTeamMemberModal);
