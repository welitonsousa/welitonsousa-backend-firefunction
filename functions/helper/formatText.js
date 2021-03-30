/* eslint-disable max-len */
const formatText = (str) => {
  const formate = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
  const notFormat = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
  let newString = "";
  for (let i = 0; i < str.length; i++) {
    let change = false;
    for (let a = 0; a < formate.length; a++) {
      if (str.substr(i, 1) == formate.substr(a, 1)) {
        newString += notFormat.substr(a, 1);
        change = true;
        break;
      }
    }
    if (change == false) {
      newString += str.substr(i, 1);
    }
  }
  return newString;
};

module.exports = formatText;
