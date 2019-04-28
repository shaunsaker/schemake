import React from 'react';

import SignUp from '../../layouts/pages/SignUp';

const Page = (props) => {
  return <SignUp {...props} />;
};

Page.getInitialProps = async () => {
  return {};
};

export default Page;
