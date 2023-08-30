import { Attribute, ProductProjection } from '@commercetools/platform-sdk';

export default function createFilterObject(productsList: ProductProjection[]) {
  const filters: Filter = {};

  productsList.forEach((product) => {
    const attributes = product.masterVariant.attributes;
    attributes?.forEach((attr: Attribute) => {
      if (!(attr.name in filters)) {
        filters[attr.name] = new Set();
      }
      filters[attr.name].add(attr.value);
    });
  });

  // console.log('FILTERS', typeof Array.from(filters.weight)[0]);

  const result: Filters[] = [];

  for (const key in filters) {
    result.push({ name: key, values: Array.from(filters[key]) });
  }

  console.log('RESULTS', result);
  return result;
}

interface Filter {
  [key: string]: Set<string>;
}

interface Filters {
  name: string;
  values: string[];
}
