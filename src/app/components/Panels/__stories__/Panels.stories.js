import React from 'react';
import { storiesOf } from '@storybook/react';

import Panels from '..';

const items = [
  {
    name: 'users',
    type: 'collection',
    items: [
      {
        name: 'uid',
        type: 'document',
        items: [
          {
            name: 'name',
            type: 'field',
          },
          {
            name: 'email',
            type: 'field',
          },
          {
            name: 'age',
            type: 'field',
          },
          {
            name: 'meta',
            type: 'object',
            items: [
              {
                name: 'uid',
                type: 'field',
              },
            ],
          },
          {
            name: 'other',
            type: 'object',
            items: [],
          },
          {
            name: 'friends',
            type: 'array',
            items: [
              {
                name: 'uid',
                type: 'field',
              },
            ],
          },
          {
            name: 'likes',
            type: 'array',
            items: [],
          },
        ],
      },
    ],
  },
];

storiesOf('Components|Panels', module).add('default', () => <Panels items={items} />);
