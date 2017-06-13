const sortOther = function (a, b, sortBy, reverse) {
  let nameA = a[sortBy];
  let nameB = b[sortBy];
  if (reverse) {
    nameA = b[sortBy];
    nameB = a[sortBy];
  }
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  if (nameA === undefined) {
    return -1;
  }

  // names must be equal
  return 0;
};

const sortString = function (a, b, sortBy, reverse) {
  let nameA;
  let nameB;
  a[sortBy] ? nameA = a[sortBy].toUpperCase() : nameA = a[sortBy];
  b[sortBy] ? nameB = b[sortBy].toUpperCase() : nameB = b[sortBy];
  if (reverse) {
    b[sortBy] ? nameA = b[sortBy].toUpperCase() : nameA = b[sortBy];
    a[sortBy] ? nameB = a[sortBy].toUpperCase() : nameB = a[sortBy];
  }
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};

export function combineSort (sortBy: string | number, obj) {
  return obj.sort(function (a, b) {
    if (!a || !b) return obj;
    if (typeof a[sortBy[0]] === 'string') return sortString(a, b, sortBy[0], sortBy[1]);
    return sortOther(a, b, sortBy[0], sortBy[1]);
  });
}
