import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';
import Panels from '../../../components/Panels';
import BlankState from '../../../components/BlankState';

const ViewProject = ({ headerBarProps, types, items, isLoading }) => {
  let mainComponent;

  if (isLoading) {
    mainComponent = <BlankState />;
  } else {
    mainComponent = <Panels types={types} items={items} />;
  }

  return (
    <Layout headerBarProps={headerBarProps}>
      <div className="container">{mainComponent}</div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

ViewProject.propTypes = {
  headerBarProps: PropTypes.shape({}),
  types: PropTypes.shape({}),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
};

ViewProject.defaultProps = {};

export default ViewProject;
