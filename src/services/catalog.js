import node_modules from '@/assets/node_modules.json';

export const Catalog = {
  get: () => node_modules,
  getMarkedPath: () => {
    const iter = (item, parent) => {
      const updatedItem = { ...item, path: parent?.path ? `${parent.path}/${item.name}` : item.name };

      if (updatedItem.contents?.length > 0) {
        return { ...updatedItem, contents: updatedItem.contents.map(i => iter(i, updatedItem)) };
      }

      return updatedItem;
    };

    return iter(node_modules);
  },
};
