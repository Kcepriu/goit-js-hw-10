export default class TemplateHTML {
  // * List countries
  getHtmlTextItemsListCountry(arrayCountries) {
    const strHTML = arrayCountries.reduce((strHTML, value) => {
      strHTML += this.getHtmlTextItemListCountry(value);
      return strHTML;
    }, '');

    return strHTML;
  }

  getHtmlTextItemListCountry(data) {
    const {
      name: { official: nameCountry },
      flags: { svg: srcFlag },
    } = data;

    return `
  <li class="item_list_country">
    <img src="${srcFlag}" alt="Flag ${nameCountry}" width="30" />
    <span>${nameCountry}</span>
  </li>
  `;
  }
  // * One country
  getHtmlTextCountry(data) {
    const {
      name: { official: nameCountry },
      flags: { svg: srcFlag },
      capital: [nameCapital],
      population,
      languages,
    } = data;

    let strHTML = this.getTemplateNameCOuntry(nameCountry, srcFlag);

    strHTML += this.getTemplateInformationCoutry('Capital', nameCapital);
    strHTML += this.getTemplateInformationCoutry('Population', population);
    strHTML += this.getTemplateInformationCoutry(
      'Languages',
      this.langToStr(languages)
    );

    return strHTML;
  }

  getTemplateNameCOuntry(nameCountry, srcFlag) {
    return `<div class="title_country">
           <img src="${srcFlag}" alt="Flag ${nameCountry}" width="30" />
           <span class="name__country">${nameCountry}</span>
       </div>`;
  }
  getTemplateInformationCoutry(nameInformation, valueInformation) {
    return `<p class="info__city">
          <span class="info__city--parametr">${nameInformation}:</span>${valueInformation}
        </p>`;
  }
  langToStr(languages) {
    return Object.values(languages).reduce(
      (str, value) => (str += (str ? ', ' : '') + value),
      ''
    );
  }
}
