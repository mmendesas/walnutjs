/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */

const flattenObject = (ob) => {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) { continue; }

    if ((typeof ob[i]) === 'object') {
      const flatObject = flattenObject(ob[i]);

      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) { continue; }

        toReturn[`${i}.${x}`] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }

  return toReturn;
};

module.exports = {
  flattenObject,
};
