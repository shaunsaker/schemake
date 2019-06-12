import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { modals, routes } from '../../../config';
import fields from './fields';

import Login from './Login';

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onForgotPassword = this.onForgotPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.signInWithEmail = this.signInWithEmail.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    uid: PropTypes.string,
    isAnonymous: PropTypes.bool,
    hasError: PropTypes.bool,
    isLoading: PropTypes.bool,
    userEmail: PropTypes.string,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * If there is a user and the user is no longer anonymous
     * And if there was not a user
     */
    const { isLoading, hasError } = this.props;

    if (!isLoading && prevProps.isLoading && !hasError && !prevProps.hasError) {
      this.redirectToDashboard();
    }

    /*
     * If there is an error
     * And there was not an error
     */
    if (hasError && !prevProps.hasError) {
      this.setIsLoading(false);
    }
  }

  onForgotPassword() {
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: modals.forgotPasswordModal.key,
      },
    });
  }

  onSubmit({ email, password }) {
    /*
     * If the user is already signed in with the same email
     */
    const { userEmail } = this.props;

    if (userEmail === email) {
      this.redirectToDashboard();
    } else {
      this.setIsLoading(true);
      this.signInWithEmail({ email, password });
    }
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

  signInWithEmail({ email, password }) {
    const { dispatch } = this.props;

    dispatch({
      type: 'signInWithEmail',
      payload: {
        email,
        password,
      },
      meta: {
        nextActions: [
          {
            type: 'SIGN_IN_USER',
          },
          {
            type: 'SET_IS_LOADING',
            payload: {
              isLoading: false,
            },
          },
        ],
      },
    });
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

    return <Login form={form} handleForgotPassword={this.onForgotPassword} />;
  }
}

function mapStateToProps(state) {
  const { user, appState } = state;
  const { uid, isAnonymous } = user;
  const { systemMessage, isLoading } = appState;
  const hasError = systemMessage.variant === 'error' ? true : false;
  const userEmail = user.email;

  return {
    uid,
    isAnonymous,
    hasError,
    isLoading,
    userEmail,
  };
}

export default connect(mapStateToProps)(LoginContainer);
