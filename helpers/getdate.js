function getdates(start, end) {
  const arr = [];
  const dt = new Date(start);

  while (dt <= end) {
    arr.push(new Date(dt).toString());
    dt.setDate(dt.getDate() + 1);
  }

  return arr;
}

module.exports = getdates;
