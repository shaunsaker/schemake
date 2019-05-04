import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar as ToolBar } from '@material-ui/core';
import Link from 'next/link';

import muiStyles from './muiStyles';
import styles from './styles';
import { colors } from '../../static/styles/styleConstants';

import Typography from '../Typography';
import ActionPanel from '../ActionPanel';

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

          <div className="alpha-text-container">
            <Typography type="small" color={colors.transWhite}>
              ALPHA
            </Typography>
          </div>
        </div>

        {textComponent}

        <div className="action-panel-container">
          <ActionPanel actions={actions} color={colors.transWhite} />
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
