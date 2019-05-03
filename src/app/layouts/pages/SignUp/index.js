import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../../config';
import fields from './fields';

import SignUp from './SignUp';

import withSaveDocument from '../../../enhancers/withSaveDocument';

export class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.setUserData = this.setUserData.bind(this);
    this.createUserWithEmailAndPassword = this.createUserWithEmailAndPassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);

    this.state = {
      userData: null,
    };
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    isAnonymous: PropTypes.bool,
    hasError: PropTypes.bool,
    isLoading: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    uid: PropTypes.string,

    /*
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * If we're still loading
     * If the user is no longer anonymous
     * And they were anonymous
     */
    const { isLoading, isAnonymous } = this.props;

    if (isLoading && !isAnonymous && prevProps.isAnonymous) {
      const { userData } = this.state;

      this.setIsLoading(false);
      this.saveUser(userData);
    }

    /*
     * If there is an error
     * And there was not an error previously
     */
    const { hasError } = this.props;

    if (hasError && !prevProps.hasError) {
      this.setIsLoading(false);
    }

    /*
     * If we are no longer saving
     * And a modal is not showing
     * User data was saved
     * Let's redirect
     */
    const { isSaving, isModalOpen } = this.props;

    if (!isSaving && prevProps.isSaving && !isModalOpen) {
      this.redirectToDashboard();
    }
  }

  onSubmit({ name, organisation, email, password }) {
    this.setIsLoading(true);
    this.setUserData({ name, organisation, email });
    this.createUserWithEmailAndPassword({ email, password });
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

  setUserData(userData) {
    this.setState({
      userData,
    });
  }

  createUserWithEmailAndPassword({ email, password }) {
    const { dispatch } = this.props;

    dispatch({
      type: 'getEmailAuthCredential',
      payload: {
        email,
        password,
      },
      meta: {
        nextActions: [
          {
            type: 'linkWithCredential',
            meta: {
              nextActions: [
                {
                  type: 'SIGN_IN_USER',
                },
              ],
            },
          },
        ],
      },
    });
  }

  saveUser(userData) {
    const { saveDocument, uid } = this.props;
    const url = `users/${uid}`;
    const document = userData;

    saveDocument({ url, document });
  }

  redirectToDashboard() {
    Router.push(routes.dashboard.href);
  }

  render() {
    const { isLoading } = this.props;
    const form = {
      fields,
      disabled: isLoading,
      handleSubmit: this.onSubmit,
    };

    return <SignUp form={form} />;
  }
}

function mapStateToProps(state) {
  const { user, appState, modals } = state;
  const { isAnonymous, uid } = user;
  const { systemMessage, isLoading } = appState;
  const hasError = systemMessage.variant === 'error' ? true : false;
  const isModelOpen = modals.isOpen ? true : false;

  return {
    isAnonymous,
    hasError,
    isLoading,
    isModelOpen,
    uid,
  };
}

export default withSaveDocument(connect(mapStateToProps)(SignUpContainer));
