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
    this.signOutUser = this.signOutUser.bind(this);
    this.signInWithEmail = this.signInWithEmail.bind(this);
    this.redirectToProjects = this.redirectToProjects.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    uid: PropTypes.string,
    hasError: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * If there is a user
     * And if there was not a user
     */
    const { uid } = this.props;

    if (uid && !prevProps.uid) {
      this.redirectToProjects();
    }

    /*
     * If there is an error
     * And there was not an error
     */
    const { hasError } = this.props;

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
    this.setIsLoading(true);
    this.signOutUser();
    this.signInWithEmail({ email, password });
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

  signOutUser() {
    const { dispatch } = this.props;

    dispatch({
      type: 'signOut',
      meta: {
        nextActions: [
          {
            type: 'SIGN_OUT_USER',
          },
        ],
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
        ],
      },
    });
  }

  redirectToProjects() {
    Router.push(routes.projects.href);
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
  const { uid } = user;
  const { systemMessage, isLoading } = appState;
  const hasError = systemMessage.variant === 'error' ? true : false;

  return {
    uid,
    hasError,
    isLoading,
  };
}

export default connect(mapStateToProps)(LoginContainer);
