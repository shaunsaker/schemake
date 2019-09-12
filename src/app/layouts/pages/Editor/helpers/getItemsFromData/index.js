/*
 * Takes an array of type data objects
 *
 * E.g.
 *
 *  [
 *      {
 *          id,
 *          name,
 *          parentId,
 *          type
 *      }
 *  ]
 *
 * which needs to be converted and returned as:
 *
 *  [
 *      {
 *          type,
 *          name,
 *          children
 *      }
 *  ]
 *
 * using the parentId and id to create the children at the appropriate places
 */
const getItemsFromData = (data) => {
  // console.log({ data });
  const items = [];

  data.forEach((item) => {
    const { parentId } = item;
    // console.log({ parentId });

    if (parentId) {
      const { id } = item;
      // console.log({ id });
    } else {
      /*
       * If there is no parentId, it's a shallow type, ie. first level
       */
      items.push(item);
    }
  });

  return items;
};

export default getItemsFromData;
