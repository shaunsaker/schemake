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
    avatarText: PropTypes.string,
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
    const { text, avatarText } = this.props;
    const avatar = avatarText && {
      text: avatarText,
      menu: {
        items: avatarMenuItems,
        isOpen: isMenuOpen,
        handleClick: this.onAvatarMenuItemClick,
        handleClose: this.onAvatarMenuClose,
      },
      handleClick: this.onAvatarClick,
    };

    return <HeaderBar text={text} avatar={avatar} />;
  }
}

const mapStateToProps = (state) => {
  const { user } = state;

  /*
   * Show the user's avatar if they are logged in
   */
  const shouldShowAvatar = user.uid && !user.isAnonymous;
  const avatarText = shouldShowAvatar && user.email.slice(0, 2);

  return {
    avatarText,
  };
};

export default connect(mapStateToProps)(HeaderBarContainer);
