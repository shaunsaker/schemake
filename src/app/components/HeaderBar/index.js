import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar as ToolBar } from '@material-ui/core';
import Link from 'next/link';

import muiStyles from './muiStyles';
import styles from './styles';

import Typography from '../Typography';
import Avatar from '../Avatar';

const HeaderBar = ({ text, avatar }) => {
  const textComponent = text && (
    <Typography type="paragraph" color="white" bold>
      {text}

      <style jsx>{styles}</style>
    </Typography>
  );
  const avatarComponent = avatar && (
    <button type="button" onClick={avatar.handleClick} className="avatar-button">
      <Avatar text={avatar.text} />

      <style jsx>{styles}</style>
    </button>
  );

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
  }),
};
HeaderBar.defaultProps = {};

export default HeaderBar;
