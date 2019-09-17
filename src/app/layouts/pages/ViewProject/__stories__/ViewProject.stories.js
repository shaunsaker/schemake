import React from 'react';
import { storiesOf } from '@storybook/react';

import ViewProject from '../ViewProject';
import items from '../../../../components/Panels/__stories__/items';
import types from '../../../../components/Panels/__stories__/types';

const headerBarProps = {
  text: 'PROJECT TITLE',
  actions: [
    {
      id: 'share',
      iconName: 'share',
      tooltip: 'Share this project',
    },
  ],
};

storiesOf('Layouts|ViewProject', module)
  .add('default', () => <ViewProject headerBarProps={headerBarProps} types={types} items={items} />)
  .add('blank state', () => (
    <ViewProject headerBarProps={headerBarProps} types={types} items={[]} />
  ));
