import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class AuthHandler extends React.Component {
  constructor(props) {
    super(props);

    this.signInAnonymously = this.signInAnonymously.bind(this);

    this.getAuthAction = {
      type: 'getAuth',
      meta: {
        nextActions: [
          {
            type: 'SIGN_IN_USER',
          },
        ],
      },
    };
  }

  static get propTypes() {
    return {
      // connect
      dispatch: PropTypes.func.isRequired,
      authenticated: PropTypes.bool,
    };
  }

  componentDidMount() {
    const { authenticated } = this.props;

    if (!authenticated) {
      this.signInAnonymously();
    } else {
      this.getAuth();
    }
  }

  getAuth() {
    const { dispatch } = this.props;

    dispatch(this.getAuthAction);
  }

  signInAnonymously() {
    const { dispatch } = this.props;

    dispatch({
      type: 'signInAnonymously',
      meta: {
        nextActions: [this.getAuthAction],
      },
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  const authenticated = state.user.uid ? true : false;

  return {
    authenticated,
  };
};

export default connect(mapStateToProps)(AuthHandler);
