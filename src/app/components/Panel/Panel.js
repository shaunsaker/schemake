import React from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

import styles from './styles';
import { colors, sizes } from '../../static/styles/styleConstants';

import Typography from '../Typography';
import IconButton from '../IconButton';
import ActionPanel from '../ActionPanel';

const Panel = ({ title, actions, isCollapsed, handleToggleCollapse, children, style }) => {
  // FIXME: Remove cursor on ExpansionPanel
  const containerStyles = {
    width: '100%',
    marginTop: 0,
    boxShadow: 'none',
    border: `1px solid ${colors.lightGrey}`,
    borderRadius: sizes.borderRadius,
    ...style,
  };
  const toggleButtonStyles = { transform: `rotate(${isCollapsed ? 0 : 180}deg)` };
  const toggleButtonTooltipText = isCollapsed ? 'Expand' : 'Collapse';

  return (
    <ExpansionPanel expanded={!isCollapsed} style={containerStyles}>
      <ExpansionPanelSummary>
        <div className="header-container">
          <Typography type="paragraph" bold>
            {title}
          </Typography>

          <div className="actions-container">
            <div className="toggle-button-container" style={toggleButtonStyles}>
              <IconButton
                iconName="expand-more"
                tooltip={toggleButtonTooltipText}
                handleClick={handleToggleCollapse}
              />
            </div>

            <ActionPanel actions={actions} />
          </div>
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails style={{ flexDirection: 'column' }}>{children}</ExpansionPanelDetails>

      <style jsx>{styles}</style>
    </ExpansionPanel>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({})),
  isCollapsed: PropTypes.bool,
  style: PropTypes.shape({}),
  handleToggleCollapse: PropTypes.func,
  children: PropTypes.node,
};
Panel.defaultProps = {};

export default Panel;
