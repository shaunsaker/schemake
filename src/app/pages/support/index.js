import React from 'react';

import Support from '../../layouts/pages/Support';

const Page = (props) => {
  return <Support {...props} />;
};

Page.getInitialProps = async () => {
  return {};
};

export default Page;
