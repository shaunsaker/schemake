import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { app } from '../../../config';
import styles from './styles';

import Layout from '../../../components/Layout';
import Typography from '../../../components/Typography';
import TabBar from '../../../components/TabBar';
import General from '../../tabs/profile/General';

const Profile = ({ dateText, currentTabIndex, tabs, handleTabClick, handleEditProfileClick }) => {
  return (
    <Layout>
      <div className="container">
        <div className="text-container">
          <Typography type="title" gutterBottom>
            Profile
          </Typography>

          <Typography type="paragraph">
            Joined <b>{app.name}</b> {dateText}
          </Typography>
        </div>

        <div className="tab-bar-container">
          <TabBar currentTabIndex={currentTabIndex} tabs={tabs} handleClick={handleTabClick} />
        </div>

        <div className="tabs-container">
          <SwipeableViews index={currentTabIndex} onChangeIndex={handleTabClick}>
            <div className="tab-container">
              <General handleEditProfileClick={handleEditProfileClick} />
            </div>

            <div className="tab-container">
              <div />
            </div>
          </SwipeableViews>
        </div>
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Profile.propTypes = {
  dateText: PropTypes.string,
  currentTabIndex: PropTypes.number,
  tabs: PropTypes.arrayOf(PropTypes.shape({})),
  handleTabClick: PropTypes.func,
  handleEditProfileClick: PropTypes.func,
};
Profile.defaultProps = {};

export default Profile;
