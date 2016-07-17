export function compareFeatured(a, b) {
  if (a.featured < b.featured)
    return -1;
  if (a.featured > b.featured)
    return 1;
  return 0;
}
