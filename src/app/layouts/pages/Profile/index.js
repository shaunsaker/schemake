import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import tabs from './tabs';
import { getDateTime } from '../../../utils';
import { modals } from '../../../config';

import Profile from './Profile';

import withRouteCondom from '../../../enhancers/withRouteCondom';

export class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onTabClick = this.onTabClick.bind(this);
    this.onEditProfileClick = this.onEditProfileClick.bind(this);
    this.setCurrentTabIndex = this.setCurrentTabIndex.bind(this);

    this.state = {
      currentTabIndex: 0,
    };
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    dateText: PropTypes.string,
  };

  static defaultProps = {};

  onTabClick(tabIndex) {
    this.setCurrentTabIndex(tabIndex);
  }

  onEditProfileClick() {
    this.openEditProfileModal();
  }

  setCurrentTabIndex(currentTabIndex) {
    this.setState({
      currentTabIndex,
    });
  }

  openEditProfileModal() {
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: modals.editProfileModal.key,
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
        handleEditProfileClick={this.onEditProfileClick}
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