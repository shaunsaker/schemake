import React from 'react';

import ViewProject from '../../layouts/pages/ViewProject';

const Page = (props) => {
  return <ViewProject {...props} />;
};

Page.getInitialProps = async () => {
  return {};
};

export default Page;
