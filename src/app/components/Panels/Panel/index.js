import React from 'react';
import PropTypes from 'prop-types';

import { colors } from '../../../static/styles/styleConstants';

import Panel from './Panel';

export class PanelContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onToggleCollapse = this.onToggleCollapse.bind(this);
    this.setIsCollapsed = this.setIsCollapsed.bind(this);

    this.state = {
      isCollapsed: false,
    };
  }

  static propTypes = {
    type: PropTypes.string,
    fieldType: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.node,
    handleAdd: PropTypes.func,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
  };

  static defaultProps = {};

  onToggleCollapse() {
    const { isCollapsed } = this.state;

    this.setIsCollapsed(!isCollapsed);
  }

  setIsCollapsed(isCollapsed) {
    this.setState({
      isCollapsed,
    });
  }

  render() {
    const { isCollapsed: isCollapsedState } = this.state;
    const { children } = this.props;

    /*
     * Get the borderColor based on type
     */
    const { type } = this.props;
    const borderColor = colors[type];
    const { fieldType } = this.props;
    const typeText = fieldType || type;
    const typeTextColor = colors[fieldType || type];
    /*
     * All types beside the field have the add action and are expandable and should have an add button
     * A collection should not have an add button if it already has children
     * A document should never be expandable and should always be expanded
     */
    let isExpandable;
    let isCollapsed = isCollapsedState;
    let addButtonText;
    const hasChildren = children && children.length;
    let showAddCollectionButton;

    if (type !== 'field') {
      /*
       * Change the childType based on the type
       */
      let childType;
      isExpandable = true;

      if (type === 'collection' && !hasChildren) {
        childType = 'Document';
      } else if (type === 'document') {
        childType = 'Field';
        showAddCollectionButton = true;

        /*
         * Documents are not collapsible
         */
        isExpandable = false;
      } else if (type === 'object') {
        childType = 'Field';
      } else if (type === 'array' && !hasChildren) {
        childType = 'Field';
      }

      /*
       * Add the add action lol
       */
      if (childType) {
        addButtonText = childType;
      }
    } else {
      /*
       * Fields are always collapsed
       */
      isCollapsed = true;
    }

    /*
     * Create the actions
     * All types have the edit and delete action
     */
    const { name, handleEdit, handleDelete } = this.props;
    const actions = [
      {
        id: name,
        iconName: 'menu',
        tooltip: 'Toggle Menu',
        menu: {
          items: [
            {
              name: `Edit ${name}`,
              handleClick: handleEdit,
            },
            {
              name: `Delete ${name}`,
              handleClick: handleDelete,
            },
          ],
        },
      },
    ];

    return (
      <Panel
        {...this.props}
        borderColor={borderColor}
        typeText={typeText}
        typeTextColor={typeTextColor}
        addButtonText={addButtonText}
        actions={actions}
        isCollapsed={isCollapsed}
        isExpandable={isExpandable}
        showAddCollectionButton={showAddCollectionButton}
        handleToggleCollapse={this.onToggleCollapse}
      >
        {children}
      </Panel>
    );
  }
}

export default PanelContainer;
