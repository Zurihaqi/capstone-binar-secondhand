///? Fungsi ini untuk meng-update beberapa field dalam object
module.exports = (oldObj, newObj) => {
  for (const property in oldObj) {
    if (oldObj[property]) {
      newObj[property] = oldObj[property];
    }
  }
  return newObj;
};
