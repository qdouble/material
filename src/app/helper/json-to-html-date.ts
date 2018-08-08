export function jsonToHtmlDate(jsonDate) {
  let date = new Date(jsonDate);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
