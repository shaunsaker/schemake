import React from 'react';

import links from './links';

import FooterBar from './FooterBar';

const FooterBarContainer = () => {
  return <FooterBar links={links} />;
};

FooterBarContainer.propTypes = {};
FooterBarContainer.defaultProps = {};

export default FooterBarContainer;
