import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Panel from './Panel';

const renderPanel = (item) => {
  const { name, items } = item;

  return (
    <div key={name} className="item-container">
      <Panel {...item}>{items && items.map(renderPanel)}</Panel>

      <style jsx>{styles}</style>
    </div>
  );
};

const Panels = ({ items }) => {
  return (
    <div className="container">
      {items && items.map(renderPanel)}

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
};
Panels.defaultProps = {};

export default Panels;
