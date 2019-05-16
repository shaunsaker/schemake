import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUID } from 'js-simple-utils';

import fields from './fields';

import AddTeamMemberModal from './AddTeamMemberModal';

import withSaveDocument from '../../../enhancers/withSaveDocument';

export class AddTeamMemberModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.saveTeamMember = this.saveTeamMember.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Parent
     */
    isOpen: PropTypes.bool,
    teamId: PropTypes.string,
    handleClose: PropTypes.func.isRequired,

    /*
     * Store
     */
    uid: PropTypes.string,

    /*
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,
    hasSuccess: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * On success
     */
    const { hasSuccess } = this.props;

    if (hasSuccess && !prevProps.hasSuccess) {
      this.closeModal();
    }
  }

  onSubmit(form) {
    this.saveTeamMember(form);
  }

  onClose() {
    this.closeModal();
  }

  saveTeamMember({ email }) {
    const { uid, teamId, saveDocument } = this.props;
    const url = `_invites/${createUID()}`;
    const document = {
      uid,
      dateCreated: Date.now(),
      teamId,
      email,
    };

    saveDocument({
      url,
      document,
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    // TODO: Success state
    const { isOpen, isSaving } = this.props;
    const isDisabled = isSaving;
    const title = 'Add Team Member';
    const description =
      "Add your team member's email address and we'll send them a link to join your team.";
    const form = {
      fields,
      disabled: isDisabled,
      secondaryButton: {
        text: 'CANCEL',
        handleClick: this.onClose,
      },
      handleSubmit: this.onSubmit,
    };

    return (
      <AddTeamMemberModal
        title={title}
        description={description}
        form={form}
        isOpen={isOpen}
        disabled={isDisabled}
        handleClose={this.onClose}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const { uid } = user;

  return {
    uid,
  };
};

export default withSaveDocument(connect(mapStateToProps)(AddTeamMemberModalContainer));
