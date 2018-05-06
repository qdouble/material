export function validateCountry(country: string) {
  let validCountries = ['US', 'CA', 'AU', 'UK', 'GB'];
  if (validCountries.includes(country)) {
    return true;
  }
  return false;
}
