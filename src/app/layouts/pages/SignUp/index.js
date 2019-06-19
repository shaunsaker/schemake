import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../../config';

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
    this.redirectToPage = this.redirectToPage.bind(this);

    this.state = {
      userData: null,
    };
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    hasError: PropTypes.bool,
    isLoading: PropTypes.bool,
    uid: PropTypes.string,

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
     * If we're still loading
     * If the user now has a uid
     */
    const { isLoading, uid } = this.props;

    if (isLoading && uid && !prevProps.uid) {
      this.saveUser();
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
     * On save success
     */
    const { hasSuccess } = this.props;

    if (hasSuccess && !prevProps.hasSuccess) {
      this.redirectToPage('dashboard');
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

  saveUser() {
    const { userData } = this.state;
    const { saveDocument, uid } = this.props;
    const url = `users/${uid}`;
    const document = {
      ...userData,
      dateCreated: Date.now(),
    };

    saveDocument({ url, document });
  }

  redirectToPage(page) {
    Router.push(routes[page].href);
  }

  render() {
    const { isLoading, isSaving } = this.props;
    const isDisabled = (isLoading || isSaving) && true;

    return <SignUp isDisabled={isDisabled} handleSubmit={this.onSubmit} />;
  }
}

function mapStateToProps(state) {
  const { user, appState } = state;
  const { uid } = user;
  const { systemMessage, isLoading } = appState;
  const hasError = systemMessage.variant === 'error' ? true : false;

  return {
    hasError,
    isLoading,
    uid,
  };
}

export default withSaveDocument(connect(mapStateToProps)(SignUpContainer));
