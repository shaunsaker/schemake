import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import tabs from './tabs';
import { getQueryStringParams } from '../../../utils';

import Dashboard from './Dashboard';

import withRouteCondom from '../../../enhancers/withRouteCondom';

export class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onTabClick = this.onTabClick.bind(this);
    this.setCurrentTabIndex = this.setCurrentTabIndex.bind(this);
    this.handleSetRoute = this.handleSetRoute.bind(this);

    /*
     * Get the current tab index from the query params
     */
    const { tabID } = getQueryStringParams(window.location.search);
    const currentTabIndex = tabs.findIndex((tab) => tab.id === tabID);

    this.state = {
      currentTabIndex,
    };
  }

  static propTypes = {};

  static defaultProps = {};

  onTabClick(tabIndex) {
    this.setCurrentTabIndex(tabIndex);
    this.handleSetRoute(tabIndex);
  }

  setCurrentTabIndex(currentTabIndex) {
    this.setState({
      currentTabIndex,
    });
  }

  handleSetRoute(tabIndex) {
    /*
     * Get the tabID
     */
    const tabID = tabs[tabIndex].id;

    Router.push({
      pathname: window.location.pathname,
      query: {
        tabID,
      },
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
