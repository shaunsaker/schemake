import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../config';

import HeaderBar from './HeaderBar';

export class HeaderBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenUserMenu = this.onOpenUserMenu.bind(this);
    this.onViewProfile = this.onViewProfile.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onCloseUserMenu = this.onCloseUserMenu.bind(this);
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
     * Store
     */
    dispatch: PropTypes.func,
    shouldShowUserIcon: PropTypes.bool,
  };

  static defaultProps = {};

  onOpenUserMenu() {
    const { isUserMenuOpen } = this.state;

    this.setIsUserMenuOpen(!isUserMenuOpen);
  }

  onViewProfile() {
    this.setIsUserMenuOpen(false);
    this.redirectToPage('profile');
  }

  onSignOut() {
    this.cancelSync();
    this.signOutUser();
    this.redirectToPage('login');
  }

  onCloseUserMenu() {
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
    });
  }

  render() {
    const { isUserMenuOpen } = this.state;
    const { text, shouldShowUserIcon } = this.props;
    const isLoginPage = window.location.pathname.indexOf('login') > -1;
    const actions = [];

    if (shouldShowUserIcon) {
      actions.push({
        iconName: 'account-circle',
        tooltip: 'Toggle user menu',
        handleClick: this.onOpenUserMenu,
        menu: {
          items: [
            { name: 'Profile', handleClick: this.onViewProfile },
            { name: 'Sign Out', handleClick: this.onSignOut },
          ],
          isOpen: isUserMenuOpen,
          handleClose: this.onCloseUserMenu,
        },
      });
    } else if (!isLoginPage) {
      actions.push({
        text: 'Login',
        href: routes.login.href,
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
