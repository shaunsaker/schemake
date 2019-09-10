import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';
import AddButton from '../../../components/AddButton';
import Panels from '../../../components/Panels';

const Editor = ({
  headerBarProps,
  items,
  handleAddCollection,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  const hasItems = items && items.length;

  return (
    <Layout headerBarProps={headerBarProps}>
      <div className="container">
        <Panels
          items={items}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <div className={hasItems ? 'add-button-container' : ''}>
          <AddButton handleClick={handleAddCollection}>ADD COLLECTION</AddButton>
        </div>
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Editor.propTypes = {
  headerBarProps: PropTypes.shape({}),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  handleAddCollection: PropTypes.func,
  handleAdd: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

Editor.defaultProps = {};

export default Editor;
