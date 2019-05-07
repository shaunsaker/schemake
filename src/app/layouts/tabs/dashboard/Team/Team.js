import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import PrimaryButton from '../../../../components/PrimaryButton';
import DashboardListItem from '../../../../components/DashboardListItem';
import AddButton from '../../../../components/AddButton';

const addButtonText = 'ADD TEAM MEMBER';

const Team = ({ items, handleAddButtonClick }) => {
  return (
    <div className="container">
      <div className="button-container">
        <PrimaryButton handleClick={handleAddButtonClick}>{addButtonText}</PrimaryButton>
      </div>

      <div className="items-container">
        {items &&
          items.map((item) => (
            <div key={item.id} className="item-container">
              <DashboardListItem {...item} />
            </div>
          ))}

        <div className="item-container">
          <AddButton handleClick={handleAddButtonClick}>{addButtonText}</AddButton>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

Team.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ),
  handleAddButtonClick: PropTypes.func,
};
Team.defaultProps = {};

export default Team;
