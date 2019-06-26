import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';

const Editor = () => {
  return (
    <Layout>
      <div className="container">
        <div />
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Editor.propTypes = {};
Editor.defaultProps = {};

export default Editor;
