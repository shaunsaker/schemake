import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="container">
        <div />
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default Dashboard;
