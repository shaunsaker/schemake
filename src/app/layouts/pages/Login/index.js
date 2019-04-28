import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../../config';
import fields from './fields';

import Login from './Login';

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onForgotPassword = this.onForgotPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.signInWithEmail = this.signInWithEmail.bind(this);
    this.redirectToProjects = this.redirectToProjects.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    isAnonymous: PropTypes.bool,
    hasError: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * If the user is no longer anonymous
     * And they were anonymous
     */
    // FIXME: This won't work if I'm already signed in and I sign in again
    const { isAnonymous } = this.props;

    if (!isAnonymous && prevProps.isAnonymous) {
      // TODO: Test this once SignUp implemented
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
        key: 'forgotPasswordModal',
      },
    });
  }

  onSubmit({ email, password }) {
    this.setIsLoading(true);
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

  signInWithEmail({ email, password }) {
    const { dispatch } = this.props;

    dispatch({
      type: 'signInWithEmail',
      payload: {
        email,
        password,
      },
    });
  }

  redirectToProjects() {
    Router.push(routes.projects.href);
  }

  render() {
    const { isLoading } = this.props;

    return (
      <Login
        fields={fields}
        disabled={isLoading}
        handleForgotPassword={this.onForgotPassword}
        handleSubmit={this.onSubmit}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user, appState } = state;
  const { isAnonymous } = user;
  const { systemMessage, isLoading } = appState;
  const hasError = systemMessage.variant === 'error' ? true : false;

  return {
    isAnonymous,
    hasError,
    isLoading,
  };
}

export default connect(mapStateToProps)(LoginContainer);
