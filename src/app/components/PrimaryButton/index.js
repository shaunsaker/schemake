import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from '@material-ui/core';

import styles from './styles';
import { colors } from '../../static/styles/styleConstants';

import Icon from '../Icon';
import CircularProgress from '../CircularProgress';

const PrimaryButton = ({
  type,
  href,
  iconName,
  secondary,
  accent,
  small,
  ghost,
  text,
  children,
  loading,
  disabled,
  handleClick,
}) => {
  const style = {
    ...styles.container,
    ...(!secondary && !ghost && !disabled && !text && { color: 'white' }),
    ...(accent && { backgroundColor: colors.accent }),
  };

  const iconComponent = iconName && (
    <Fragment>
      <Icon name={iconName} /> <div style={styles.spacer} />
    </Fragment>
  );

  const loadingComponent = loading && (
    <div style={styles.loadingContainer}>
      <CircularProgress small />
    </div>
  );

  const buttonComponent = (
    <Button
      type={type}
      variant={ghost ? 'outlined' : text ? 'text' : 'contained'}
      color={secondary || text ? 'secondary' : 'primary'}
      size={small ? 'small' : 'large'}
      style={style}
      disabled={disabled}
      onClick={handleClick}
    >
      {iconComponent}

      {children}

      {loadingComponent}
    </Button>
  );

  if (href) {
    return <Link href={href}>{buttonComponent}</Link>;
  }

  return buttonComponent;
};

PrimaryButton.propTypes = {
  type: PropTypes.string, // e.g. submit
  href: PropTypes.string,
  iconName: PropTypes.string,
  secondary: PropTypes.bool,
  accent: PropTypes.bool,
  small: PropTypes.bool,
  ghost: PropTypes.bool,
  text: PropTypes.bool,
  children: PropTypes.node,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
};
PrimaryButton.defaultProps = {};

export default PrimaryButton;
