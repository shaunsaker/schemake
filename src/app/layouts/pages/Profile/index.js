import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import tabs from './tabs';
import { getDateTime, getQueryStringParams } from '../../../utils';

import Profile from './Profile';

import withRouteCondom from '../../../enhancers/withRouteCondom';

export class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onTabClick = this.onTabClick.bind(this);
    this.getCurrentTabIndex = this.getCurrentTabIndex.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.setCurrentTabIndex = this.setCurrentTabIndex.bind(this);
    this.handleSetRoute = this.handleSetRoute.bind(this);

    this.state = {
      currentTabIndex: this.getCurrentTabIndex(),
    };
  }

  static propTypes = {
    /*
     * Store
     */
    dateText: PropTypes.string,
  };

  static defaultProps = {};

  componentDidMount() {
    Router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  onTabClick(tabIndex) {
    this.setCurrentTabIndex(tabIndex);
    this.handleSetRoute(tabIndex);
  }

  getCurrentTabIndex() {
    /*
     * Get the current tab index from the query params
     */
    const { tabId } = getQueryStringParams(window.location.search);
    const currentTabIndex = tabs.findIndex((tab) => tab.id === tabId);

    return currentTabIndex > -1 ? currentTabIndex : 0;
  }

  handleRouteChange() {
    const { currentTabIndex } = this.state;
    const tabIndex = this.getCurrentTabIndex();

    /*
     * If the route's tab indices don't match
     */
    if (tabIndex !== currentTabIndex) {
      this.setCurrentTabIndex(tabIndex);
    }
  }

  setCurrentTabIndex(currentTabIndex) {
    this.setState({
      currentTabIndex,
    });
  }

  handleSetRoute(tabIndex) {
    /*
     * Get the tabId
     */
    const tabId = tabs[tabIndex].id;

    Router.push({
      pathname: window.location.pathname,
      query: {
        tabId,
      },
    });
  }

  render() {
    const { currentTabIndex } = this.state;
    const { dateText } = this.props;

    return (
      <Profile
        dateText={dateText}
        currentTabIndex={currentTabIndex}
        tabs={tabs}
        handleTabClick={this.onTabClick}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  const createdTime =
    (user.createdAt && Number(user.createdAt)) || (user.metadata && user.metadata.creationTime);
  const createdDate = new Date(createdTime);
  const dateText = getDateTime(createdDate);
  const dateTextString = `on ${dateText}`;

  return {
    dateText: dateTextString,
  };
}

export default withRouteCondom(connect(mapStateToProps)(ProfileContainer));
