import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar as ToolBar } from '@material-ui/core';
import Link from 'next/link';

import muiStyles from './muiStyles';
import styles from './styles';

import Typography from '../Typography';
import Avatar from '../Avatar';
import Menu from '../Menu';

const HeaderBar = ({ text, avatar }) => {
  const textComponent = text && (
    <Typography type="paragraph" color="white" bold>
      {text}

      <style jsx>{styles}</style>
    </Typography>
  );
  let avatarComponent;

  if (avatar) {
    const menuComponent = avatar.menu && (
      <Menu
        items={avatar.menu.items}
        anchorElID="avatar"
        isOpen={avatar.menu.isMenuOpen}
        handleClick={avatar.menu.handleClick}
        handleClose={avatar.menu.handleClose}
      />
    );

    avatarComponent = (
      <button type="button" onClick={avatar.handleClick} className="avatar-button">
        <Avatar id="avatar" text={avatar.text} />

        {menuComponent}

        <style jsx>{styles}</style>
      </button>
    );
  }

  return (
    <AppBar position="fixed" style={muiStyles.wrapper}>
      <ToolBar style={muiStyles.container}>
        <div className="logo-image-container">
          <Link href="/">
            <img src="/static/images/logo.png" alt="Pep Logo" className="logo-image" />
          </Link>
        </div>

        {textComponent}

        <div className="avatar-container">{avatarComponent}</div>
      </ToolBar>

      <style jsx>{styles}</style>
    </AppBar>
  );
};

HeaderBar.propTypes = {
  text: PropTypes.string,
  avatar: PropTypes.shape({
    text: PropTypes.string,
    handleClick: PropTypes.func,
    menu: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({})),
      isOpen: PropTypes.bool,
      handleClick: PropTypes.func,
      handleClose: PropTypes.func,
    }),
  }),
};
HeaderBar.defaultProps = {};

export default HeaderBar;
