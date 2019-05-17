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
    this.setEmail = this.setEmail.bind(this);
    this.saveTeamMember = this.saveTeamMember.bind(this);
    this.setIsSuccessful = this.setIsSuccessful.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      isSuccessful: false,
      email: null,
    };
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
    name: PropTypes.string,

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
      this.setIsSuccessful(true);
    }
  }

  onSubmit(form) {
    const { email } = form;

    this.setEmail(email);
    this.saveTeamMember(email);
  }

  onClose() {
    this.closeModal();
  }

  setEmail(email) {
    this.setState({
      email,
    });
  }

  saveTeamMember(email) {
    const { uid, teamId, name, saveDocument } = this.props;
    const url = `_invites/${createUID()}`;
    const document = {
      uid,
      dateCreated: Date.now(),
      teamId,
      email,
      invitee: name,
    };

    saveDocument({
      url,
      document,
    });
  }

  setIsSuccessful(isSuccessful) {
    this.setState({
      isSuccessful,
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { isSuccessful } = this.state;
    const { isOpen, isSaving } = this.props;
    const isDisabled = isSaving;
    let title = 'Add Team Member';
    let description =
      "Add your team member's email address and we'll send them a link to join your team.";
    let form = {
      fields,
      disabled: isDisabled,
      secondaryButton: {
        text: 'CANCEL',
        handleClick: this.onClose,
      },
      handleSubmit: this.onSubmit,
    };

    if (isSuccessful) {
      const { email } = this.state;

      title = 'Add Team Member Success.';
      description = `We'll send an invite to ${email} shortly.`;
      form = null;
    }

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
  const { user, userData } = state;
  const { uid } = user;
  const { name } = userData;

  return {
    uid,
    name,
  };
};

export default withSaveDocument(connect(mapStateToProps)(AddTeamMemberModalContainer));
