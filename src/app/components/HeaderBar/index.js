import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../config';
import userMenuItems from './userMenuItems';

import HeaderBar from './HeaderBar';

export class HeaderBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onUserIconClick = this.onUserIconClick.bind(this);
    this.onUserMenuItemClick = this.onUserMenuItemClick.bind(this);
    this.onUserMenuClose = this.onUserMenuClose.bind(this);
    this.setIsUserMenuOpen = this.setIsUserMenuOpen.bind(this);
    this.redirectToPage = this.redirectToPage.bind(this);
    this.cancelSync = this.cancelSync.bind(this);
    this.signOutUser = this.signOutUser.bind(this);

    this.state = {
      isUserMenuOpen: false,
    };
  }

  static propTypes = {
    /*
     * Parent
     */
    text: PropTypes.string,

    /*
     * Connect
     */
    dispatch: PropTypes.func,
    shouldShowUserIcon: PropTypes.bool,
  };

  static defaultProps = {};

  onUserIconClick() {
    const { isUserMenuOpen } = this.state;

    this.setIsUserMenuOpen(!isUserMenuOpen);
  }

  onUserMenuItemClick(item) {
    this.setIsUserMenuOpen(false);

    // FIXME: This is not a very declarative approach
    if (item.name === 'Profile') {
      this.redirectToPage('profile');
    } else if (item.name === 'Sign Out') {
      this.cancelSync();
      this.signOutUser();
      this.redirectToPage('login');
    }
  }

  onUserMenuClose() {
    this.setIsUserMenuOpen(false);
  }

  setIsUserMenuOpen(isUserMenuOpen) {
    this.setState({
      isUserMenuOpen,
    });
  }

  redirectToPage(pageKey) {
    Router.push(routes[pageKey].href);
  }

  cancelSync() {
    const { dispatch } = this.props;

    dispatch({
      type: 'CANCEL_SYNC',
    });
  }

  signOutUser() {
    const { dispatch } = this.props;

    dispatch({
      type: 'signOut',
      meta: {
        nextActions: [
          {
            type: 'signInAnonymously',
            meta: {
              nextActions: [
                {
                  type: 'SIGN_IN_USER',
                },
              ],
            },
          },
        ],
      },
    });
  }

  render() {
    const { isUserMenuOpen } = this.state;
    const { text, shouldShowUserIcon } = this.props;
    const actions = [];

    if (shouldShowUserIcon) {
      actions.push({
        iconName: 'account-circle',
        tooltip: 'Toggle user menu',
        handleClick: this.onUserIconClick,
        menu: {
          items: userMenuItems,
          isOpen: isUserMenuOpen,
          handleClick: this.onUserMenuItemClick,
          handleClose: this.onUserMenuClose,
        },
      });
    }

    return <HeaderBar text={text} actions={actions} />;
  }
}

const mapStateToProps = (state) => {
  const { user } = state;

  /*
   * Show the user's avatar if they are logged in
   */
  const shouldShowUserIcon = user.uid && !user.isAnonymous;

  return {
    shouldShowUserIcon,
  };
};

export default connect(mapStateToProps)(HeaderBarContainer);
