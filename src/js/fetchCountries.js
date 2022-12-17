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

const dd = [
  {
    flags: {
      png: 'https://flagcdn.com/w320/ch.png',
      svg: 'https://flagcdn.com/ch.svg',
    },
    name: {
      common: 'Switzerland',
      official: 'Swiss Confederation',
      nativeName: {
        fra: { official: 'Confédération suisse', common: 'Suisse' },
        gsw: {
          official: 'Schweizerische Eidgenossenschaft',
          common: 'Schweiz',
        },
        ita: { official: 'Confederazione Svizzera', common: 'Svizzera' },
        roh: { official: 'Confederaziun svizra', common: 'Svizra' },
      },
    },
    capital: ['Bern'],
    altSpellings: [
      'CH',
      'Swiss Confederation',
      'Schweiz',
      'Suisse',
      'Svizzera',
      'Svizra',
    ],
    languages: {
      fra: 'French',
      gsw: 'Swiss German',
      ita: 'Italian',
      roh: 'Romansh',
    },
    population: 8654622,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/se.png',
      svg: 'https://flagcdn.com/se.svg',
    },
    name: {
      common: 'Sweden',
      official: 'Kingdom of Sweden',
      nativeName: {
        swe: { official: 'Konungariket Sverige', common: 'Sverige' },
      },
    },
    capital: ['Stockholm'],
    altSpellings: ['SE', 'Kingdom of Sweden', 'Konungariket Sverige'],
    languages: { swe: 'Swedish' },
    population: 10353442,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/sz.png',
      svg: 'https://flagcdn.com/sz.svg',
    },
    name: {
      common: 'Eswatini',
      official: 'Kingdom of Eswatini',
      nativeName: {
        eng: { official: 'Kingdom of Eswatini', common: 'Eswatini' },
        ssw: { official: 'Umbuso weSwatini', common: 'eSwatini' },
      },
    },
    capital: ['Mbabane'],
    altSpellings: [
      'SZ',
      'Swaziland',
      'weSwatini',
      'Swatini',
      'Ngwane',
      'Kingdom of Eswatini',
      'Umbuso weSwatini',
    ],
    languages: { eng: 'English', ssw: 'Swazi' },
    population: 1160164,
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/bw.png',
      svg: 'https://flagcdn.com/bw.svg',
    },
    name: {
      common: 'Botswana',
      official: 'Republic of Botswana',
      nativeName: {
        eng: { official: 'Republic of Botswana', common: 'Botswana' },
        tsn: { official: 'Lefatshe la Botswana', common: 'Botswana' },
      },
    },
    capital: ['Gaborone'],
    altSpellings: ['BW', 'Republic of Botswana', 'Lefatshe la Botswana'],
    languages: { eng: 'English', tsn: 'Tswana' },
    population: 2351625,
  },
];
