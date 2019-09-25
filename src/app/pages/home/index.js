import React from 'react';

import Home from '../../layouts/pages/Home';

const Page = (props) => {
  return <Home {...props} />;
};

Page.getInitialProps = async () => {
  return {};
};

export default Page;
