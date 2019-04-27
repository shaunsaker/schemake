import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from '@material-ui/core';

import styles from './styles';

import Typography from '../Typography';

const FooterBar = ({ links }) => {
  return (
    <div className="container">
      <div className="content-container">
        {links.map((link) => {
          return (
            <Link href={link.href}>
              <Button style={{ textTransform: 'none' }}>
                <Typography type="link" color="white" style={{ textDecorationLine: 'none' }}>
                  {link.name}
                </Typography>
              </Button>
            </Link>
          );
        })}
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

FooterBar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};
FooterBar.defaultProps = {};

export default FooterBar;
