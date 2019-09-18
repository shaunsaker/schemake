import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';
import AddButton from '../../../components/AddButton';
import Panels from '../../../components/Panels';

const Editor = ({
  headerBarProps,
  types,
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
          types={types}
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
  types: PropTypes.shape({}),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  handleAddCollection: PropTypes.func,
  handleAdd: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

Editor.defaultProps = {};

export default memo(Editor);
