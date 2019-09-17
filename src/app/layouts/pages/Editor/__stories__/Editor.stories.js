import React from 'react';
import { storiesOf } from '@storybook/react';

import Editor from '../Editor';
import items from '../../../../components/Panels/__stories__/items';
import types from '../../../../components/Panels/__stories__/types';

const headerBarProps = {
  text: 'PROJECT TITLE',
  actions: [
    {
      id: 'share',
      iconName: 'share',
      tooltip: 'Share this project',
      href: '/',
    },
  ],
};

storiesOf('Layouts|Editor', module)
  .add('default', () => (
    <Editor
      headerBarProps={headerBarProps}
      types={types}
      items={items}
      handleAddItem={console.log}
      handleEditItem={console.log}
      handleDeleteItem={console.log}
    />
  ))
  .add('blank state', () => (
    <Editor
      headerBarProps={headerBarProps}
      types={types}
      items={[]}
      handleAddItem={console.log}
      handleEditItem={console.log}
      handleDeleteItem={console.log}
    />
  ));
