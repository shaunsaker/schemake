import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { app } from '../../../config';
import styles from './styles';

import Layout from '../../../components/Layout';
import IconButton from '../../../components/IconButton';
import Typography from '../../../components/Typography';
import TabBar from '../../../components/TabBar';
import General from './General';
import DangerZone from './DangerZone';

const Profile = ({ dateText, currentTabIndex, tabs, handleBackClick, handleTabClick }) => {
  return (
    <Layout>
      <div className="container">
        <div className="text-container">
          <div className="title-container">
            <div className="back-button-container">
              <IconButton
                iconName="chevron-left"
                tooltip="Back to Dashboard"
                handleClick={handleBackClick}
              />
            </div>

            <Typography type="title" gutterBottom>
              Profile
            </Typography>
          </div>

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
              <General />
            </div>

            <div className="tab-container">
              <DangerZone />
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
  handleBackClick: PropTypes.func,
  handleTabClick: PropTypes.func,
};
Profile.defaultProps = {};

export default Profile;
