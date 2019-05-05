import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';

export class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return <Dashboard />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(DashboardContainer);
