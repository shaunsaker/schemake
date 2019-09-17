const types = {
  collection: {
    name: 'Collection',
    color: '#009688',
    validChildrenTypes: [
      {
        typeId: 'document',
        allowMultipleOfSameType: false,
      },
      {
        typeId: 'field',
        allowMultipleOfSameType: true,
      },
    ],
  },
  document: {
    name: 'Document',
    color: '#2196f3',
    validChildrenTypes: [
      {
        typeId: 'collection',
        allowMultipleOfSameType: true,
      },
      {
        typeId: 'field',
        allowMultipleOfSameType: true,
      },
    ],
  },
  object: {
    name: 'Object',
    color: '#9C27B0',
    validChildrenTypes: [
      {
        typeId: 'field',
        allowMultipleOfSameType: true,
      },
    ],
  },
  array: {
    name: 'Array',
    color: '#ff9800',
    validChildrenTypes: [
      {
        typeId: 'field',
        allowMultipleOfSameType: true,
      },
    ],
  },
  string: {
    name: 'String',
    isField: true,
    color: '#3f51b5',
    validChildrenTypes: [],
  },
  number: {
    name: 'Number',
    isField: true,
    color: '#e91e63',
    validChildrenTypes: [],
  },
  boolean: {
    name: 'Boolean',
    isField: true,
    color: '#FF5722',
    validChildrenTypes: [],
  },
  date: {
    name: 'Date',
    isField: true,
    color: '#4caf50',
    validChildrenTypes: [],
  },
};

export default types;
