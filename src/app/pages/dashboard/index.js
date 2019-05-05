import React from 'react';

import Dashboard from '../../layouts/pages/Dashboard';

const Page = (props) => {
  return <Dashboard {...props} />;
};

Page.getInitialProps = async () => {
  return {};
};

export default Page;
