import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../../config';

import DeleteProjectModal from './DeleteProjectModal';

import withSaveDocument from '../../../enhancers/withSaveDocument';

export class DeleteProjectModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.saveUser = this.saveUser.bind(this);
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
      this.saveUser();
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
    this.deleteProject();
    this.saveUser();
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

  deleteProject() {
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

  saveUser() {
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
    const { isSuccessful: hasSuccess } = this.state;
    const { isOpen, isLoading, isSaving } = this.props;
    const isDisabled = (isLoading || isSaving) && true;

    return (
      <DeleteProjectModal
        isOpen={isOpen}
        hasSuccess={hasSuccess}
        isDisabled={isDisabled}
        handleClose={this.onClose}
        handleSubmit={this.onSubmit}
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

export default withSaveDocument(connect(mapStateToProps)(DeleteProjectModalContainer));
