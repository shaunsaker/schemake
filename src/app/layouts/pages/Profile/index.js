import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Profile from './Profile';

import withRouteCondom from '../../../enhancers/withRouteCondom';

export class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return <Profile />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouteCondom(connect(mapStateToProps)(ProfileContainer));
