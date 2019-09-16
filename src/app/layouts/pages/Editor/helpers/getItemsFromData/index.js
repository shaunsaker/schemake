import { cloneObject } from 'js-simple-utils';

/*
 * Takes an array of type data objects
 *
 * E.g.
 *
 *  [
 *      {
 *          id,
 *          name,
 *          refs: [ ...parentIds ],
 *          typeId
 *      },
 *      {
 *          id,
 *          name,
 *          refs,
 *          typeId
 *      }
 *  ]
 *
 * which needs to be converted and returned as:
 *
 *  [
 *      {
 *          typeId,
 *          name,
 *          items: [
 *            { ...this }
 *           ]
 *      }
 *  ]
 *
 * using the parentId and id to create the items at the appropriate places
 */

/*
 * Find the leaf node and attach the item to that node's items
 */
const attachItemToItems = ({ items, item, level = 0 }) => {
  const newItems = items;
  const { refs } = item;

  items.forEach((testItem, index) => {
    /*
     * Does the testItem's id match the ref in refs at index of level, ie. testItem.id === refs[0]
     * If so, increment the level and check testItem.items for the same
     * Until there are no more refs, at which point, assign the item to items of that node
     */
    const refAtLevel = refs[level];

    if (testItem.id === refAtLevel) {
      /*
       * Is there another level, if so, call this
       * Else, attach the item to the testItem's items
       */
      const nextLevel = level + 1;
      const hasNextLevel = Boolean(refs[nextLevel]);
      const newItem = testItem;

      if (hasNextLevel) {
        const newItemItems = newItem.items;
        newItem.items = attachItemToItems({ items: newItemItems, item, level: nextLevel });
      } else {
        const newItemItems = newItem.items;
        newItemItems.push(item);

        /*
         * Sort the items so that the fields are always first
         * FIXME: Eventually we'll use an order prop
         */
        const clonedNewItemItems = cloneObject(newItemItems);
        const sortedNewItemsItems = clonedNewItemItems.sort((a, b) => {
          if (a.fieldTypeId && !b.fieldTypeId) {
            return -1;
          }

          if (!a.fieldTypeId && b.fieldTypeId) {
            return 1;
          }

          return 0;
        });

        newItem.items = sortedNewItemsItems;
      }

      newItems[index] = newItem;
    }
  });

  return newItems;
};

const getItemsFromData = (data = []) => {
  /*
   * Sort the data by the length of the items array
   * This will push all leaf nodes to the end of the array
   * and we can be confident that when we need to attach them
   * their parents already exist
   */

  const sortedData = data.sort((a, b) => {
    if (a.refs.length < b.refs.length) {
      return -1;
    }

    if (a.refs.length > b.refs.length) {
      return 1;
    }

    return 0;
  });

  /*
   * Give each item in sortedData items
   * FIXME: This step is actually not necessary, we could just check if items exists and create as needed
   */
  const sortedDataWithItems = sortedData.map((item) => {
    return {
      ...item,
      items: [],
    };
  });

  let items = [];

  sortedDataWithItems.forEach((item) => {
    const { refs } = item;

    if (!refs.length) {
      items.push(item);
    } else {
      items = attachItemToItems({ items, item });
    }
  });

  return items;
};

export default getItemsFromData;
