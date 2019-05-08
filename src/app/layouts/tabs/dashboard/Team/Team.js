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
          items.map((item) => {
            const { name } = item;
            const avatarText = name.slice(0, 1);
            const title = name;
            const description = '';
            const menu = null;

            return (
              <div key={item.id} className="item-container">
                <DashboardListItem
                  avatarText={avatarText}
                  title={title}
                  description={description}
                  menu={menu}
                />
              </div>
            );
          })}

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
