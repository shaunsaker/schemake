const fields = [
  {
    type: 'text',
    name: 'name',
    label: 'Name',
    required: true,
    autoComplete: 'off',
  },
  {
    type: 'select',
    name: 'fieldTypeId',
    label: 'Field Type',
    required: true,
    options: [], // attached in index.js
  },
];

export default fields;
