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
    this.saveDeleteUser = this.saveDeleteUser.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.cancelSync = this.cancelSync.bind(this);
    this.signOut = this.signOut.bind(this);
    this.redirectToPage = this.redirectToPage.bind(this);

    this.state = {};
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

    /*
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,
    hasSuccess: PropTypes.bool,
  };

  static defaultProps = {};

  onSubmit() {
    this.saveDeleteUser();
  }

  onClose() {
    const { hasSuccess } = this.props;

    if (hasSuccess) {
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
        nextActions: [{ type: 'SIGN_IN_USER' }, { type: 'PURGE_STORE' }],
      },
    });
  }

  redirectToPage(pageKey) {
    Router.push(routes[pageKey].href);
  }

  render() {
    const { isOpen, isSaving, hasSuccess } = this.props;
    const isDisabled = isSaving && true;

    return (
      <DeleteUserModal
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
  const { user } = state;
  const { uid } = user;

  return {
    uid,
  };
};

export default withSaveDocument(connect(mapStateToProps)(DeleteUserModalContainer));
