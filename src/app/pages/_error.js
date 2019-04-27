import React from 'react';

import Error from '../layouts/pages/Error';

const Page = (props) => {
  return <Error {...props} />;
};

Page.getInitialProps = async () => {};

export default Page;
