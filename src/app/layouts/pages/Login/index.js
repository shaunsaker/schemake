import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fields from './fields';

import Login from './Login';

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onForgotPassword = this.onForgotPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  onForgotPassword() {}

  onSubmit({ email, password }) {}

  render() {
    return (
      <Login
        fields={fields}
        handleForgotPassword={this.onForgotPassword}
        handleSubmit={this.onSubmit}
      />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(LoginContainer);
