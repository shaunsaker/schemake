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
    actions: PropTypes.arrayOf(PropTypes.shape({})),

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
      meta: {
        nextActions: [{ type: 'SIGN_IN_USER' }, { type: 'PURGE_STORE' }],
      },
    });
  }

  render() {
    const { isUserMenuOpen } = this.state;
    const { actions: additionalActions, shouldShowUserIcon } = this.props;
    const isSignUpPage = window.location.pathname.indexOf('signup') > -1;
    let actions = [];

    if (additionalActions) {
      actions = [...additionalActions];
    }

    if (shouldShowUserIcon) {
      actions.push({
        id: 'account',
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
    } else if (!isSignUpPage) {
      actions.push({
        id: 'signup',
        text: 'Signup',
        href: routes.signUp.href,
      });
    }

    return <HeaderBar {...this.props} actions={actions} />;
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
