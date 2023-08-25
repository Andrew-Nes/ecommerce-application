import { getCategories } from '../api/apiFunctions';
import { Languages } from '../types/commonDataTypes';
import { categoriesObj } from './data/categories';

export function catalogListCreation(): JSX.Element[] {
  const catalogList: JSX.Element[] = [];

  if (categoriesObj.isEmpty()) {
    getCategories().then(({ body }) => {
      const results = body.results;
      results.forEach((result) =>
        categoriesObj.setCategory(result.key, result.name, result.id)
      );
    });
  }

  const categoriesName = categoriesObj.getCategoriesName(Languages.ENGLISH);

  categoriesName.forEach((categoryName) => {
    catalogList.push(<li className="list__item">{categoryName}</li>);
  });

  return catalogList;
}
