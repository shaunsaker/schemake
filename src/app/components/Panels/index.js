import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Panel from './Panel';

const renderPanel = ({ item, level, types, handleAdd, handleEdit, handleDelete }) => {
  const { name, items } = item;
  const hasBg = level % 2 !== 0 ? true : false;

  return (
    <div key={name} className="item-container">
      <Panel
        {...item}
        types={types}
        hasBg={hasBg}
        handleAdd={({ typeId }) => handleAdd({ typeId, item })}
        handleEdit={() => handleEdit({ item })}
        handleDelete={() => handleDelete({ item })}
      >
        {items &&
          items.map((item2) => {
            const newLevel = level + 1;

            return renderPanel({
              item: item2,
              level: newLevel,
              types,
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

const Panels = ({ items, types, handleAdd, handleEdit, handleDelete }) => {
  return (
    <div className="container">
      {items &&
        items.map((item, index) =>
          renderPanel({ item, index, level: 0, types, handleAdd, handleEdit, handleDelete }),
        )}

      <style jsx>{styles}</style>
    </div>
  );
};

Panels.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  ),
  types: PropTypes.shape({}),
  handleAdd: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};
Panels.defaultProps = {};

export default Panels;
