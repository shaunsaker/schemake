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
            type: 'string',
          },
          {
            name: 'isAdmin',
            type: 'boolean',
          },
          {
            name: 'age',
            type: 'number',
          },
          {
            name: 'dateJoined',
            type: 'date',
          },
          {
            name: 'meta',
            type: 'object',
            items: [
              {
                name: 'uid',
                type: 'string',
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
                type: 'string',
              },
            ],
          },
          {
            name: 'likes',
            type: 'array',
            items: [],
          },
          {
            name: 'posts',
            type: 'collection',
            items: [],
          },
        ],
      },
    ],
  },
];

export default items;
