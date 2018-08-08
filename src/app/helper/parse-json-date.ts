export function parseJsonDate(jsonDateString) {
  return new Date(parseInt(jsonDateString.replace('/Date(', ''), undefined));
}
