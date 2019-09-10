import { convertObjectToArray, firstCharToUpperCase } from 'js-simple-utils';

import { types } from '../../../config';

const typesArray = convertObjectToArray(types);
const fieldTypes = typesArray.filter((item) => item.isField);
const fieldTypeOptions = fieldTypes.map((item) => {
  const { id } = item;
  const value = id;
  const label = firstCharToUpperCase(value);

  return {
    value,
    label,
  };
});

const fields = [
  {
    type: 'select',
    name: 'type',
    label: 'Field Type',
    required: true,
    options: fieldTypeOptions,
  },
];

export default fields;
