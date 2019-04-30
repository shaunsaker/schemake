import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DangerZone from './DangerZone';

export class DangerZoneContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return <DangerZone />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(DangerZoneContainer);
