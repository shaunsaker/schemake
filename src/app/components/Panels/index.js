import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Panel from './Panel';

const renderPanel = (item, handleAdd, handleEdit, handleDelete) => {
  const { name, items } = item;

  return (
    <div key={name} className="item-container">
      <Panel
        {...item}
        handleAdd={() => handleAdd(item)}
        handleEdit={() => handleEdit(item)}
        handleDelete={() => handleDelete(item)}
      >
        {items && items.map((item2) => renderPanel(item2, handleAdd, handleEdit, handleDelete))}
      </Panel>

      <style jsx>{styles}</style>
    </div>
  );
};

const Panels = ({ items, handleAdd, handleEdit, handleDelete }) => {
  return (
    <div className="container">
      {items && items.map((item) => renderPanel(item, handleAdd, handleEdit, handleDelete))}

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
  handleAdd: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};
Panels.defaultProps = {};

export default Panels;
