import React from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

import styles, { inlineStyles } from './styles';
import { colors } from '../../../static/styles/styleConstants';

import Typography from '../../Typography';
import IconButton from '../../IconButton';
import ActionPanel from '../../ActionPanel';
import AddButton from '../../AddButton';

const Panel = ({
  name,
  typeText,
  typeColor,
  addButtons,
  actions,
  hasBg,
  isCollapsed,
  isExpandable,
  children,
  style,
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

        <style jsx>{styles}</style>
      </div>
    );
  }

  const addButtonsComponent =
    addButtons && addButtons.length
      ? addButtons.map((item, index) => {
          const { text, handleClick } = item;
          const isNotFirstItem = index !== 0;

          return (
            <div id={text} className={isNotFirstItem ? 'add-button-container' : ''}>
              <AddButton handleClick={handleClick}>{text}</AddButton>

              <style jsx>{styles}</style>
            </div>
          );
        })
      : null;

  const backgroundColor = hasBg && colors.veryLightGrey;

  return (
    <ExpansionPanel
      expanded={!isCollapsed}
      style={{ ...inlineStyles.expansionPanel, ...style, borderColor: typeColor, backgroundColor }}
    >
      <ExpansionPanelSummary style={inlineStyles.expansionPanelSummary}>
        <div className="header-container">
          <div className="header-text-container">
            <Typography type="paragraph" bold>
              {name}
            </Typography>

            <div className="field-type-container">
              <Typography type="small" color={typeColor}>
                {typeText}
              </Typography>
            </div>
          </div>

          <div className="actions-container">
            {toggleButtonComponent}

            <ActionPanel actions={actions} />
          </div>
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails style={inlineStyles.expansionPanelDetails}>
        {children}

        {addButtonsComponent}
      </ExpansionPanelDetails>

      <style jsx>{styles}</style>
    </ExpansionPanel>
  );
};

Panel.propTypes = {
  name: PropTypes.string,
  typeText: PropTypes.string,
  typeColor: PropTypes.string,
  addButtons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
  actions: PropTypes.arrayOf(PropTypes.shape({})),
  hasBg: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  isExpandable: PropTypes.bool,
  style: PropTypes.shape({}),
  children: PropTypes.node,
  handleToggleCollapse: PropTypes.func,
};
Panel.defaultProps = {};

export default Panel;
