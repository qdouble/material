export function validateCountry(ipCountry: string, offerCountryId: string) {
  if (!ipCountry || ipCountry === '') return true;
  if (ipCountry === offerCountryId) return true;
  if (ipCountry === 'UK' && offerCountryId === 'GB') return true;
  return false;
}
