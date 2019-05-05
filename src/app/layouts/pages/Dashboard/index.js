import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import tabs from './tabs';

import Dashboard from './Dashboard';

import withRouteCondom from '../../../enhancers/withRouteCondom';

export class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onTabClick = this.onTabClick.bind(this);
    this.setCurrentTabIndex = this.setCurrentTabIndex.bind(this);

    this.state = {
      currentTabIndex: 0,
    };
  }

  static propTypes = {};

  static defaultProps = {};

  onTabClick(tabIndex) {
    this.setCurrentTabIndex(tabIndex);
  }

  setCurrentTabIndex(currentTabIndex) {
    this.setState({
      currentTabIndex,
    });
  }

  render() {
    const { currentTabIndex } = this.state;

    return (
      <Dashboard currentTabIndex={currentTabIndex} tabs={tabs} handleTabClick={this.onTabClick} />
    );
  }
}

function mapStateToProps() {
  return {};
}

export default withRouteCondom(connect(mapStateToProps)(DashboardContainer));
