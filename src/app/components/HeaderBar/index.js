import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import avatarMenuItems from './avatarMenuItems';

import HeaderBar from './HeaderBar';

export class HeaderBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onAvatarClick = this.onAvatarClick.bind(this);
    this.onAvatarMenuItemClick = this.onAvatarMenuItemClick.bind(this);
    this.onAvatarMenuClose = this.onAvatarMenuClose.bind(this);
    this.setIsMenuOpen = this.setIsMenuOpen.bind(this);

    this.state = {
      isMenuOpen: false,
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
    shouldShowAvatar: PropTypes.bool,
  };

  static defaultProps = {};

  onAvatarClick() {
    console.log('clicked');
  }

  onAvatarMenuItemClick(item) {
    console.log('clicked', item);
  }

  onAvatarMenuClose() {
    console.log('clicked');
  }

  setIsMenuOpen(isMenuOpen) {
    this.setState({
      isMenuOpen,
    });
  }

  render() {
    const { isMenuOpen } = this.state;
    const { text, shouldShowAvatar } = this.props;
    // TODO: Actions

    return <HeaderBar text={text} />;
  }
}

const mapStateToProps = (state) => {
  const { user } = state;

  /*
   * Show the user's avatar if they are logged in
   */
  const shouldShowAvatar = user.uid && !user.isAnonymous;

  return {
    shouldShowAvatar,
  };
};

export default connect(mapStateToProps)(HeaderBarContainer);
