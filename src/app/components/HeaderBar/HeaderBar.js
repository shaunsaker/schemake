import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar as ToolBar } from '@material-ui/core';
import Link from 'next/link';

import muiStyles from './muiStyles';
import styles from './styles';
import { colors } from '../../static/styles/styleConstants';

import Typography from '../Typography';
import IconButton from '../IconButton';
import Menu from '../Menu';

const HeaderBar = ({ text, actions }) => {
  const textComponent = text && (
    <Typography type="paragraph" color="white" bold>
      {text}

      <style jsx>{styles}</style>
    </Typography>
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

        <div className="actions-wrapper">
          <div className="actions-container">
            {actions &&
              actions.map((action) => {
                const id = `icon-button-${action.iconName}`;
                const menuComponent = action.menu && (
                  <Menu
                    items={action.menu.items}
                    anchorElID={id}
                    isOpen={action.menu.isOpen}
                    handleClick={action.menu.handleClick}
                    handleClose={action.menu.handleClose}
                  />
                );

                return (
                  <div key={id} className="action-container">
                    <IconButton
                      id={id}
                      iconName={action.iconName}
                      tooltip={action.tooltip}
                      handleClick={action.handleClick}
                      color={colors.transWhite}
                    />

                    {menuComponent}
                  </div>
                );
              })}
          </div>
        </div>
      </ToolBar>

      <style jsx>{styles}</style>
    </AppBar>
  );
};

HeaderBar.propTypes = {
  text: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      iconName: PropTypes.string,
      tooltip: PropTypes.string,
      handleClick: PropTypes.func,
      menu: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({})),
        isOpen: PropTypes.bool.isRequired,
        handleClick: PropTypes.func,
        handleClose: PropTypes.func,
      }),
    }),
  ),
};
HeaderBar.defaultProps = {};

export default HeaderBar;
