import React from 'react';
import PropTypes from 'prop-types';

import styles, { getStyles } from './styles';

import Layout from '../../../components/Layout';
import AddButton from '../../../components/AddButton';
import Panel from '../../../components/Panel';

/*
 * NOTES:
 * Collections are collapsible
 * Documents aren't collapsible
 * Fields aren't collapsible
 * Everything should have add buttons accept fields that aren't objects or arrays
 * Everything should have menus with edit and delete options
 */
const types = {
  collection: {
    name: 'Collection',
    isExpanded: true,
  },
};

const renderItem = ({ item, type, handleAddItem, handleEditItem, handleDeleteItem }) => {
  const { id, name, data } = item;
  const { name: typeName, isExpanded } = types[type];
  const editItemText = `Edit ${typeName}`;
  const deleteItemText = `Delete ${typeName}`;
  const actions = [
    {
      iconName: 'menu',
      tooltip: 'Toggle menu',
      menu: {
        items: [
          {
            name: editItemText,
            handleClick: () => handleEditItem(item),
          },
          {
            name: deleteItemText,
            handleClick: () => handleDeleteItem(item),
          },
        ],
      },
    },
  ];
  const containerStyle = getStyles(type);

  /*
   * TODO: Convert to class
   * TODO: Render the data recursively
   */
  // const documentsComponent = item.data.length ? (
  //   <div />
  // ) : (
  //   <AddButton handleClick={() => handleAddItem({ item, type })}>ADD DOCUMENT</AddButton>
  // );

  return (
    <div key={id} className="item-container">
      <Panel title={name} actions={actions} isExpanded={isExpanded} style={containerStyle}>
        {/* {documentsComponent} */}
      </Panel>

      <style jsx>{styles}</style>
    </div>
  );
};

const Editor = ({
  headerBarProps,
  collections,
  handleAddItem,
  handleEditItem,
  handleDeleteItem,
}) => {
  const type = 'collection';
  const typeName = types[type].name;
  const addButtonText = `ADD ${typeName.toUpperCase()}`;

  return (
    <Layout headerBarProps={headerBarProps}>
      <div className="container">
        {collections.map((item) => {
          return renderItem({
            item,
            type,
            handleAddItem,
            handleEditItem,
            handleDeleteItem,
          });
        })}

        <AddButton handleClick={handleAddItem}>{addButtonText}</AddButton>
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Editor.propTypes = {
  headerBarProps: PropTypes.shape({}),
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          // THIS
        }),
      ),
    }),
  ),
  handleAddItem: PropTypes.func,
  handleEditItem: PropTypes.func,
  handleDeleteItem: PropTypes.func,
};
Editor.defaultProps = {};

export default Editor;
