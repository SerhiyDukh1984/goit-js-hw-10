// const Query = {
//   name: country,
//   capital: city,
//   population: quantity,
//   flags: img,
//   languages: [],
// };

export function fetchCountries() {
  return fetch('https://restcountries.com/v3.1/name/united?Query')
    .then(response => response.json())
    .then(console.log());
}
console.log(fetchCountries());
