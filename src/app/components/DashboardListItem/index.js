import React from 'react';
import PropTypes from 'prop-types';

import DashboardListItem from './DashboardListItem';

export class DashboardListItemCOntainer extends React.Component {
  constructor(props) {
    super(props);

    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onCloseMenu = this.onCloseMenu.bind(this);
    this.setIsMenuOpen = this.setIsMenuOpen.bind(this);

    this.state = {
      isMenuOpen: false,
    };
  }

  static propTypes = {
    menu: PropTypes.shape({}),
  };

  static defaultProps = {};

  onMenuButtonClick() {
    this.setIsMenuOpen(true);

    /*
     * TODO: Call handleMenuButtonClick
     */
  }

  onCloseMenu() {
    this.setIsMenuOpen(false);
  }

  setIsMenuOpen(isMenuOpen) {
    this.setState({
      isMenuOpen,
    });
  }

  render() {
    const { isMenuOpen } = this.state;
    const { menu } = this.props;

    if (menu) {
      menu.isOpen = isMenuOpen;
      menu.handleClose = this.onCloseMenu;
    }

    return (
      <DashboardListItem
        {...this.props}
        menu={menu}
        handleMenuButtonClick={this.onMenuButtonClick}
      />
    );
  }
}

export default DashboardListItemCOntainer;
