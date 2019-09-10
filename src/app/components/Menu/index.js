import React from 'react';
import PropTypes from 'prop-types';

import Menu from './Menu';

export class MenuContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onCloseMenu = this.onCloseMenu.bind(this);
    this.setIsOpen = this.setIsOpen.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        disabled: PropTypes.bool,
        handleClick: PropTypes.func.isRequired,
      }),
    ),
    anchorElId: PropTypes.string,
  };

  static defaultProps = {};

  onMenuButtonClick() {
    this.setIsOpen(true);
  }

  onCloseMenu() {
    this.setIsOpen(false);
  }

  setIsOpen(isOpen) {
    this.setState({
      isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Menu
        {...this.props}
        handleMenuButtonClick={this.onMenuButtonClick}
        handleClose={this.onCloseMenu}
        isOpen={isOpen}
      />
    );
  }
}

export default MenuContainer;
