import React from 'react';
import PropTypes from 'prop-types';

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
    /*
     * Parent
     */
    types: PropTypes.shape({}),
    typeId: PropTypes.string,
    parentId: PropTypes.string,
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
     * Get the type's details
     */
    const { typeId, types } = this.props;
    const type = types[typeId];
    const { name: typeText, color: typeColor, validChildrenTypes } = type || {};
    const isExpandable = Boolean(validChildrenTypes.length);
    const isCollapsed = !isExpandable || isCollapsedState;

    /*
     * If there are validChildrenTypes, create buttons to render
     */
    const hasChildren = children && children.length;
    const addButtons =
      validChildrenTypes &&
      validChildrenTypes.length &&
      validChildrenTypes
        .map((item) => {
          const { typeId: childTypeId, allowMultipleOfSameType } = item;
          const childType = types[childTypeId];
          const { name } = childType || {};

          if (!hasChildren || (hasChildren && allowMultipleOfSameType)) {
            const text = `ADD ${name ? name.toUpperCase() : 'FIELD'}`; // defaults to field
            const { handleAdd } = this.props;

            return {
              text,
              handleClick: () => handleAdd({ typeId: childTypeId }),
            };
          }

          return null;
        })
        .filter((item) => item);

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
        typeText={typeText}
        typeColor={typeColor}
        addButtons={addButtons}
        actions={actions}
        isCollapsed={isCollapsed}
        isExpandable={isExpandable}
        handleToggleCollapse={this.onToggleCollapse}
      >
        {children}
      </Panel>
    );
  }
}

export default PanelContainer;
