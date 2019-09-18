import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Panel from './Panel';

const renderPanel = ({ types, item, level, handleAdd, handleEdit, handleDelete }) => {
  const { name, items } = item;
  const hasBg = level % 2 !== 0 ? true : false;
  let handleAddFunc;
  let handleEditFunc;
  let handleDeleteFunc;

  if (handleAdd) {
    handleAddFunc = ({ typeId }) => handleAdd({ typeId, parent: item });
  }

  if (handleEdit) {
    handleEditFunc = () => handleEdit({ item });
  }

  if (handleDelete) {
    handleDeleteFunc = () => handleDelete({ item });
  }

  return (
    <div key={name} className="item-container">
      <Panel
        {...item}
        types={types}
        hasBg={hasBg}
        handleAdd={handleAddFunc}
        handleEdit={handleEditFunc}
        handleDelete={handleDeleteFunc}
      >
        {items &&
          items.map((item2) => {
            const newLevel = level + 1;

            return renderPanel({
              types,
              item: item2,
              level: newLevel,
              handleAdd,
              handleEdit,
              handleDelete,
            });
          })}
      </Panel>

      <style jsx>{styles}</style>
    </div>
  );
};

const Panels = ({ types, items, handleAdd, handleEdit, handleDelete }) => {
  return (
    <div className="container">
      {items &&
        items.map((item) =>
          renderPanel({
            types,
            item,
            level: 0,
            handleAdd,
            handleEdit,
            handleDelete,
          }),
        )}

      <style jsx>{styles}</style>
    </div>
  );
};

Panels.propTypes = {
  types: PropTypes.shape({}),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  ),
  handleAdd: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};
Panels.defaultProps = {};

export default memo(Panels);
