import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from './styles';

import Typography from '../Typography';
import PrimaryButton from '../PrimaryButton';

const FooterBar = ({ links }) => {
  return (
    <div className="container">
      <div className="content-container">
        {links.map((link) => {
          return (
            <Link key={link.href} href={link.href}>
              <div className="link-container">
                <PrimaryButton text small>
                  <Typography type="link" color="white" style={{ textDecorationLine: 'none' }}>
                    {link.name}
                  </Typography>
                </PrimaryButton>
              </div>
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
