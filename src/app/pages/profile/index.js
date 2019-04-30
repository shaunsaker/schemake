import React from 'react';

import Profile from '../../layouts/pages/Profile';

const Page = (props) => {
  return <Profile {...props} />;
};

Page.getInitialProps = async () => {
  return {};
};

export default Page;
