import React from 'react';

import Editor from '../../layouts/pages/Editor';

const Page = (props) => {
  return <Editor {...props} />;
};

Page.getInitialProps = async () => {
  return {};
};

export default Page;
