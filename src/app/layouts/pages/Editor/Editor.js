import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';
import AddButton from '../../../components/AddButton';

const Editor = ({ headerBarProps, collections, handleAddCollection }) => {
  return (
    <Layout headerBarProps={headerBarProps}>
      <div className="container">
        {collections.map((collection) => {
          // TODO:

          return null;
        })}

        <AddButton handleClick={handleAddCollection}>ADD COLLECTION</AddButton>
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Editor.propTypes = {
  headerBarProps: PropTypes.shape({}),
  collections: PropTypes.arrayOf(PropTypes.shape({})),
  handleAddCollection: PropTypes.func,
};
Editor.defaultProps = {
  projectName: 'Test',
};

export default Editor;
