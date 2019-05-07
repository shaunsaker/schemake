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

  static propTypes = {
    /*
     * Store
     */
    dateText: PropTypes.string,
  };

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
