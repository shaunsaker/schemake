import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../../config';

import DeleteUserModal from './DeleteUserModal';

import withSaveDocument from '../../../enhancers/withSaveDocument';

export class DeleteUserModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.deleteUserData = this.deleteUserData.bind(this);
    this.saveDeleteUser = this.saveDeleteUser.bind(this);
    this.setIsSuccessful = this.setIsSuccessful.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.cancelSync = this.cancelSync.bind(this);
    this.signOut = this.signOut.bind(this);
    this.redirectToPage = this.redirectToPage.bind(this);

    this.state = {
      isSuccessful: false,
    };
  }

  static propTypes = {
    /*
     * Parent
     */
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,

    /*
     * Store
     */
    dispatch: PropTypes.func,
    uid: PropTypes.string,
    isLoading: PropTypes.bool,
    hasPendingTransactions: PropTypes.bool,
    hasError: PropTypes.bool,

    /*
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,
    hasSuccess: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;

    /*
     * If loading and error
     */
    const { hasError } = this.props;

    if (isLoading && hasError && !prevProps.hasError) {
      this.setIsLoading(false);
    }

    /*
     * If loading and no more pending transactions
     */
    const { hasPendingTransactions } = this.props;

    if (isLoading && !hasPendingTransactions && prevProps.hasPendingTransactions) {
      this.setIsLoading(false);
      this.saveDeleteUser();
    }

    /*
     * On success
     */
    const { hasSuccess } = this.props;

    if (hasSuccess && !prevProps.hasSuccess) {
      this.setIsSuccessful(true);
    }
  }

  onSubmit() {
    this.setIsLoading(true);
    this.deleteUserData();
  }

  onClose() {
    const { isSuccessful } = this.state;

    if (isSuccessful) {
      /*
       * Cancel sync
       * Sign user out
       * Redirect to sign up page
       */
      this.cancelSync();
      this.signOut();
      this.redirectToPage('signUp');
    }

    this.closeModal();
  }

  setIsLoading(isLoading) {
    const { dispatch } = this.props;

    dispatch({
      type: 'SET_IS_LOADING',
      payload: {
        isLoading,
      },
    });
  }

  deleteUserData() {
    /*
     * Delete user data
     */
    const { dispatch, uid } = this.props;
    const url = `users/${uid}`;

    dispatch({
      type: 'deleteDocument',
      payload: {
        url,
      },
    });
  }

  saveDeleteUser() {
    const { saveDocument, uid } = this.props;
    const url = `deleteUsers/${uid}`;
    const document = {
      dateCreated: Date.now(),
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

  cancelSync() {
    const { dispatch } = this.props;

    dispatch({
      type: 'CANCEL_SYNC',
    });
  }

  signOut() {
    const { dispatch } = this.props;

    dispatch({
      type: 'signOut',
      meta: {
        nextActions: [{ type: 'SIGN_IN_USER' }],
      },
    });
  }

  redirectToPage(pageKey) {
    Router.push(routes[pageKey].href);
  }

  render() {
    const { isSuccessful } = this.state;
    const { isOpen, isLoading, isSaving } = this.props;
    const isDisabled = isLoading || isSaving;
    let title = 'Are you sure you want to delete data?';
    let description =
      'This action will delete your user account, team and any projects you have created. This action cannot be reversed. Please be certain.';
    let form = {
      fields: [],
      disabled: isDisabled,
      secondaryButton: {
        text: 'CANCEL',
        handleClick: this.onClose,
      },
      handleSubmit: this.onSubmit,
    };

    if (isSuccessful) {
      title = "We're sad to see you go :(";
      description =
        'Your profile has been scheduled for deletion. Please allow up to an hour for this. We will now sign you out of your account.';
      form = null;
    }

    return (
      <DeleteUserModal
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
  const { user, appState } = state;
  const { uid } = user;
  const { isLoading, pendingTransactions, systemMessage } = appState;
  const hasPendingTransactions = pendingTransactions.length ? true : false;
  const hasError = systemMessage.variant === 'error' ? true : false;

  return {
    uid,
    isLoading,
    hasPendingTransactions,
    hasError,
  };
};

export default withSaveDocument(connect(mapStateToProps)(DeleteUserModalContainer));
