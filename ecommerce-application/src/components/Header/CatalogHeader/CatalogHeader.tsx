import './catalogHeader.scss';
import { Category } from '@commercetools/platform-sdk';
import { Languages } from '../../../types/commonDataTypes';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { FC } from 'react';

interface CatalogHeaderProp {
  mainCategories: Category[];
  subCategories: Category[];
}

const CatalogHeader: FC<CatalogHeaderProp> = (props: CatalogHeaderProp) => {
  return (
    <header className="catalog__header">
      <ul className="list catalog__header__list">
        {props.mainCategories.map((category) => (
          <li className="list__item catalog__header__item" key={category.key}>
            <Link
              id={category.key}
              className="list__link catalog__header__link"
              to={`${category.key}`}
            >
              {category.name[Languages.ENGLISH]}
            </Link>
            <Tooltip
              className="tooltip"
              anchorSelect={`#${category.key}`}
              place="bottom"
              clickable
            >
              <ul className="list tooltip__list">
                {props.subCategories
                  .filter((cat) => cat.parent?.id === category.id)
                  .map((cat) => (
                    <li
                      key={cat.key}
                      className="list__item tooltip__list__item"
                    >
                      <Link
                        className="list__link tooltip__list__link"
                        to={`${category.key}/${cat.key}`}
                      >
                        {cat.name[Languages.ENGLISH]}
                      </Link>
                    </li>
                  ))}
              </ul>
            </Tooltip>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default CatalogHeader;
