import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUID } from 'js-simple-utils';

import fields from './fields';

import AddTeamMemberModal from './AddTeamMemberModal';

import withSaveDocument from '../../../enhancers/withSaveDocument';
import withSyncData from '../../../enhancers/withSyncData';

export class AddTeamMemberModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.syncUserData = this.syncUserData.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.saveInvite = this.saveInvite.bind(this);
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

    /*
     * withSyncData
     */
    syncData: PropTypes.func,
  };

  static defaultProps = {};

  componentDidMount() {
    this.syncUserData();
  }

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
    this.saveInvite(email);
  }

  onClose() {
    this.setIsSuccessful(false);
    this.closeModal();
  }

  syncUserData() {
    const { uid, syncData } = this.props;
    const url = `users/${uid}`;
    const nextActions = [{ type: 'SET_USER_DATA' }];

    syncData({
      url,
      nextActions,
    });
  }

  setEmail(email) {
    this.setState({
      email,
    });
  }

  saveInvite(email) {
    const { uid, teamId, name, saveDocument } = this.props;
    const url = `invites/${createUID()}`;
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

      title = 'Great Success.';
      description = `We'll send an invite to ${email}, inviting them to your team shortly.`;
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

export default withSyncData(
  withSaveDocument(connect(mapStateToProps)(AddTeamMemberModalContainer)),
);
