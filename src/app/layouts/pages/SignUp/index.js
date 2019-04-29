import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../../config';
import fields from './fields';

import SignUp from './SignUp';

export class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.createUserWithEmailAndPassword = this.createUserWithEmailAndPassword.bind(this);
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
      this.redirectToProjects();
    }

    /*
     * If there is an error
     * And there was not an error previously
     */
    const { hasError } = this.props;

    if (hasError && !prevProps.hasError) {
      this.setIsLoading(false);
    }
  }

  onSubmit({ email, password }) {
    this.setIsLoading(true);
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

  createUserWithEmailAndPassword({ email, password }) {
    const { dispatch } = this.props;

    dispatch({
      type: 'createUserWithEmailAndPassword',
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

    return <SignUp form={form} />;
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

export default connect(mapStateToProps)(SignUpContainer);
