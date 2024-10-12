import { CountryInterface } from "../_types/country";

function filterCountries(countries: CountryInterface[], query: string) {
  const lowerCaseQuery = query.toLowerCase();

  return countries.filter(
    (country) =>
      country.idd?.root?.toLowerCase().includes(lowerCaseQuery) ||
      country.name.common.toLowerCase().includes(lowerCaseQuery)
  );
}

export default filterCountries;
