const getQueryStringParams = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params, param) => {
        const newParams = params;
        const [key, value] = param.split('=');
        newParams[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';

        return newParams;
      }, {})
    : {};
};

export default getQueryStringParams;
