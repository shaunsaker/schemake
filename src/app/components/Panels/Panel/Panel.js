import React from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

import styles, { inlineStyles } from './styles';

import Typography from '../../Typography';
import IconButton from '../../IconButton';
import ActionPanel from '../../ActionPanel';
import AddButton from '../../AddButton';

const Panel = ({
  name,
  borderColor,
  addButtonText,
  actions,
  isCollapsed,
  isExpandable,
  children,
  style,
  handleAdd,
  handleToggleCollapse,
}) => {
  let toggleButtonComponent;

  if (isExpandable) {
    const toggleButtonStyles = { transform: `rotate(${isCollapsed ? 0 : 180}deg)` };
    const toggleButtonTooltipText = isCollapsed ? 'Expand' : 'Collapse';
    toggleButtonComponent = (
      <div className="toggle-button-container" style={toggleButtonStyles}>
        <IconButton
          iconName="expand-more"
          tooltip={toggleButtonTooltipText}
          handleClick={handleToggleCollapse}
        />
      </div>
    );
  }

  const addButtonComponent = addButtonText ? (
    <div className="addButtonContainer">
      <AddButton handleClick={handleAdd}>{`ADD ${addButtonText.toUpperCase()}`}</AddButton>
    </div>
  ) : null;

  return (
    <ExpansionPanel
      expanded={!isCollapsed}
      style={{ ...inlineStyles.expansionPanel, ...style, borderColor }}
    >
      <ExpansionPanelSummary style={inlineStyles.expansionPanelSummary}>
        <div className="header-container">
          <Typography type="paragraph" bold>
            {name}
          </Typography>

          <div className="actions-container">
            {toggleButtonComponent}

            <ActionPanel actions={actions} />
          </div>
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails style={inlineStyles.expansionPanelDetails}>
        {children}

        {addButtonComponent}
      </ExpansionPanelDetails>

      <style jsx>{styles}</style>
    </ExpansionPanel>
  );
};

Panel.propTypes = {
  name: PropTypes.string,
  borderColor: PropTypes.string,
  addButtonText: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({})),
  isCollapsed: PropTypes.bool,
  isExpandable: PropTypes.bool,
  style: PropTypes.shape({}),
  children: PropTypes.node,
  handleAdd: PropTypes.func,
  handleToggleCollapse: PropTypes.func,
};
Panel.defaultProps = {};

export default Panel;
