const getStringPlurality = (value) => {
  if (value > 1) {
    return 's';
  }

  return '';
};

export default getStringPlurality;
