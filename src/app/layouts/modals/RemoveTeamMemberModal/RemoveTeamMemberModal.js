import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/Modal';

const RemoveTeamMemberModal = ({
  isOpen,
  name,
  hasSuccess,
  isDisabled,
  handleClose,
  handleSubmit,
}) => {
  let title = `Remove ${name} from your team?`;
  let description = `This action will remove ${name} from your team. You can still invite them back to your team later.`;
  let form = {
    fields: [],
    disabled: isDisabled,
    handleSubmit,
  };

  if (hasSuccess) {
    title = 'Bye Bye.';
    description = `We've removed ${name} from your team.`;
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

RemoveTeamMemberModal.propTypes = {
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  hasSuccess: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
RemoveTeamMemberModal.defaultProps = {};

export default RemoveTeamMemberModal;
