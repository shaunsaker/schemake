const items = [
  {
    id: 'users',
    name: 'users',
    typeId: 'collection',
    items: [
      {
        id: 'uid',
        name: 'uid',
        typeId: 'document',
        items: [
          {
            id: 'name',
            name: 'name',
            typeId: 'field',
            fieldTypeId: 'string',
          },
          {
            id: 'isAdmin',
            name: 'isAdmin',
            typeId: 'field',
            fieldTypeId: 'boolean',
          },
          {
            id: 'age',
            name: 'age',
            typeId: 'field',
            fieldTypeId: 'number',
          },
          {
            id: 'dateJoined',
            name: 'dateJoined',
            typeId: 'field',
            fieldTypeId: 'date',
          },
          {
            id: 'meta',
            name: 'meta',
            typeId: 'object',
            items: [
              {
                id: 'uid2',
                name: 'uid',
                typeId: 'field',
                fieldTypeId: 'string',
              },
            ],
          },
          {
            id: 'other',
            name: 'other',
            typeId: 'object',
            items: [],
          },
          {
            id: 'friends',
            name: 'friends',
            typeId: 'array',
            items: [
              {
                id: 'uid3',
                name: 'uid',
                typeId: 'field',
              },
            ],
          },
          {
            id: 'likes',
            name: 'likes',
            typeId: 'array',
            items: [],
          },
          {
            id: 'posts',
            name: 'posts',
            typeId: 'collection',
            items: [],
          },
        ],
      },
    ],
  },
  {
    id: 'posts2',
    name: 'posts',
    typeId: 'collection',
    items: [],
  },
  {
    id: 'groups',
    name: 'groups',
    typeId: 'collection',
    items: [],
  },
];

export default items;
