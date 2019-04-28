import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class AuthHandler extends React.Component {
  constructor(props) {
    super(props);

    this.getAuth = this.getAuth.bind(this);
  }

  static get propTypes() {
    return {
      // connect
      dispatch: PropTypes.func.isRequired,
    };
  }

  componentDidMount() {
    this.getAuth();
  }

  getAuth() {
    const { dispatch } = this.props;

    dispatch({
      type: 'getAuth',
      meta: {
        nextActions: [
          {
            type: 'SIGN_IN_USER',
          },
        ],
      },
    });
  }

  render() {
    return null;
  }
}

export default connect()(AuthHandler);
