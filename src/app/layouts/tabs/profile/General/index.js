import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import General from './General';

export class GeneralContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return <General />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(GeneralContainer);
