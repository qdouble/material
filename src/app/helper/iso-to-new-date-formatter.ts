export function isoToNewDateFormatter(date) {
  if (!date) return;
  date = date.split('T')[0];
  date = date.split('-');
  return (date = new Date(date[0], date[1] - 1, date[2]));
}
