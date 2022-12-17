export default class FetchCountries {
  static URL_API = 'https://restcountries.com/v3.1';
  static NAME_SERVISE = 'name';

  constructor() {
    this.nameLastFindCountry = '';
    this.ERROR_NOT_FOUND = new Error('NOT FOUND');
  }

  getFilterFields() {
    return '?fields=name,capital,population,flags,languages';
  }

  getUrlSearchName(nameCountry) {
    return `${FetchCountries.URL_API}/${
      FetchCountries.NAME_SERVISE
    }/${nameCountry}${this.getFilterFields()}`;
  }

  findCountry(nameCountry) {
    const url = this.getUrlSearchName(nameCountry);

    return fetch(url)
      .then(r => {
        if (!r.ok) {
          if (r.status === 404) throw this.ERROR_NOT_FOUND;
          else throw new Error(r.status);
        }

        return r.json();
      })
      .then(data => {
        return data;
      });
  }
}
