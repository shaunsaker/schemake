import React from 'react';

import styles from './styles';

import Layout from '../../../components/Layout';

const Blank = () => {
  return (
    <Layout>
      <div className="container">
        <div />
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Blank.propTypes = {};
Blank.defaultProps = {};

export default Blank;
