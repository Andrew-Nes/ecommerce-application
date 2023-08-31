import { Attribute, ProductProjection } from '@commercetools/platform-sdk';

export default function createFilterObject(productsList: ProductProjection[]) {
  const filters: Filter = {};

  productsList.forEach((product) => {
    const attributes = product.masterVariant.attributes;
    attributes?.forEach((attr: Attribute) => {
      if (!(attr.name in filters)) {
        filters[attr.name] = new Set();
      }
      filters[attr.name].add(attr.value.toString());
    });
  });

  const result: Filters[] = [];

  for (const key in filters) {
    let values: string[] | number[] = Array.from(filters[key]);
    if (key === 'weight') {
      values = values
        .sort((a, b) => Number(a) - Number(b))
        .map((value) => String(value));
    } else {
      values.sort();
    }
    result.push({ name: key, values: values });
  }

  return result;
}

interface Filter {
  [key: string]: Set<string>;
}

interface Filters {
  name: string;
  values: string[];
}
