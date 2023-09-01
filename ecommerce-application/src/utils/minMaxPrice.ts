import { ProductProjection } from '@commercetools/platform-sdk';

export default function getMinMaxPrice(
  productsList: ProductProjection[]
): [number, number] {
  const prices: number[] = [];

  productsList.forEach((product) => {
    const pricesArray = product.masterVariant.prices;

    let price = 0;
    if (pricesArray && pricesArray?.length > 0) {
      const centAmount = pricesArray[0].value.centAmount;
      const fractionDigits = pricesArray[0].value.fractionDigits;
      price = centAmount / Math.pow(10, fractionDigits);
    }

    prices.push(price);
  });

  if (prices.length === 0) {
    return [0, 100];
  }
  const min = Math.floor(Math.min(...prices));
  const max = Math.ceil(Math.max(...prices));
  return [min, max];
}
