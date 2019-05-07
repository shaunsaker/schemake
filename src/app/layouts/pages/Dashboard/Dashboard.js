import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import styles from './styles';

import Layout from '../../../components/Layout';
import Typography from '../../../components/Typography';
import TabBar from '../../../components/TabBar';
import Projects from '../../tabs/dashboard/Projects';
import Team from '../../tabs/dashboard/Team';

const Dashboard = ({ currentTabIndex, tabs, handleTabClick }) => {
  return (
    <Layout>
      <div className="container">
        <div className="text-container">
          <Typography type="title" gutterBottom>
            Dashboard
          </Typography>
        </div>

        <div className="tab-bar-container">
          <TabBar currentTabIndex={currentTabIndex} tabs={tabs} handleClick={handleTabClick} />
        </div>

        <div className="tabs-container">
          <SwipeableViews index={currentTabIndex} onChangeIndex={handleTabClick}>
            <div className="tab-container">
              <Projects />
            </div>

            <div className="tab-container">
              <Team />
            </div>
          </SwipeableViews>
        </div>
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Dashboard.propTypes = {
  currentTabIndex: PropTypes.number,
  tabs: PropTypes.arrayOf(PropTypes.shape({})),
  handleTabClick: PropTypes.func,
  handleEditProfileClick: PropTypes.func,
};
Dashboard.defaultProps = {};

export default Dashboard;
