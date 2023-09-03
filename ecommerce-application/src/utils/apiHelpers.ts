import { filtersCheckboxes } from '../types/categoryTypes';

function getFiltersString(filtersObj: filtersCheckboxes | undefined): string[] {
  if (!filtersObj) {
    return [];
  }

  const resultString: string[] = [];
  for (const key of Object.keys(filtersObj)) {
    if (key === 'price') {
      continue;
    }
    if (filtersObj[key] && filtersObj[key].length > 0) {
      const value = filtersObj[key].map((value) => `"${value}"`).join(',');
      const string = `variants.attributes.${key}:${value}`;
      resultString.push(string);
    }
  }
  return resultString;
}

function getPriceFilterString(
  filtersObj: filtersCheckboxes | undefined
): string {
  const basicPriceFilterString = 'variants.prices:exists';

  if (!filtersObj) {
    return basicPriceFilterString;
  }

  const priceFilter: filtersCheckboxes = {};
  if ('price' in filtersObj) {
    priceFilter.price = filtersObj.price;
  }

  if (!priceFilter.price || priceFilter.price.length === 0) {
    return basicPriceFilterString;
  }

  const allChosenPrices: number[] = priceFilter.price
    .map((value) => value.split(' - '))
    .flat()
    .map((value) => Number(value));

  const customPriceFilterString = `variants.price.centAmount:range (${
    allChosenPrices[0] * 100
  } to ${allChosenPrices[allChosenPrices.length - 1] * 100})`;

  return customPriceFilterString;
}

export { getFiltersString, getPriceFilterString };
