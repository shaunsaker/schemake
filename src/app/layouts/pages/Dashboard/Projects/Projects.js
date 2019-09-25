import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import BlankState from '../../../../components/BlankState';
import Select from '../../../../components/Select';
import PrimaryButton from '../../../../components/PrimaryButton';
import DashboardListItem from '../../../../components/DashboardListItem';
import AddButton from '../../../../components/AddButton';

const addButtonText = 'ADD PROJECT';

const Projects = ({ hasTeams, selectProps, items, handleAddProject }) => {
  /*
   * Blank state
   */
  if (!hasTeams) {
    return (
      <div className="blank-state-container">
        <BlankState />

        <style jsx>{styles}</style>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header-container">
        <div className="header-item-container">
          <Select {...selectProps} />
        </div>

        <div className="header-item-container">
          <PrimaryButton handleClick={handleAddProject}>{addButtonText}</PrimaryButton>
        </div>
      </div>

      <div className="items-container">
        {items &&
          items.map((item) => (
            <div key={item.id} className="item-container">
              <DashboardListItem {...item} />
            </div>
          ))}

        <div className="item-container">
          <AddButton handleClick={handleAddProject}>{addButtonText}</AddButton>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

Projects.propTypes = {
  hasTeams: PropTypes.bool,
  selectProps: PropTypes.shape({}),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ),
  handleAddProject: PropTypes.func,
};
Projects.defaultProps = {};

export default memo(Projects);
