import React from 'react';

import Login from '../../layouts/pages/Login';

const Page = (props) => {
  return <Login {...props} />;
};

Page.getInitialProps = async () => {
  return {};
};

export default Page;
