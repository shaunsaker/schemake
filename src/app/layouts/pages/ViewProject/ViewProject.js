import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';
import Panels from '../../../components/Panels';

const ViewProject = ({ headerBarProps, types, items }) => {
  return (
    <Layout headerBarProps={headerBarProps}>
      <div className="container">
        <Panels types={types} items={items} />
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

ViewProject.propTypes = {
  headerBarProps: PropTypes.shape({}),
  types: PropTypes.shape({}),
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

ViewProject.defaultProps = {};

export default ViewProject;
