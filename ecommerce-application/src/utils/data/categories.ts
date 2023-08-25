import { LocalizedString } from '@commercetools/platform-sdk';
import { Languages } from '../../types/commonDataTypes';

type categoriesData = {
  [key: string]: {
    name: LocalizedString;
    id: string;
  };
};

class Categories {
  private categories: categoriesData = {};
  private count = 1;

  public isEmpty(): boolean {
    return Object.keys(this.categories).length === 0;
  }

  public setCategory(
    key: string = this.getCommonKey(),
    name: LocalizedString,
    id: string
  ): void {
    this.categories[key] = { name, id };
  }

  public getCategoriesName(language: Languages): string[] {
    return Object.values(this.categories).map((value) => value.name[language]);
  }

  public getCategoryId(key: string): string | Error {
    if (key in this.categories) {
      return this.categories[key].id;
    }
    throw new Error('No asked category');
  }

  private getCommonKey(): string {
    const name = `Key_${this.count}`;
    this.count++;
    return name;
  }
}

export const categoriesObj = new Categories();
