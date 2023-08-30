import { Category } from '@commercetools/platform-sdk';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Languages } from '../../types/commonDataTypes';

interface Filters {
  name: string;
  values: string[];
}

interface SidebarProps {
  childCategories?: Category[];
  filters?: Filters[];
}

const Sidebar: FC<SidebarProps> = (props: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar__content">
        {props.childCategories && (
          <div>
            <p>Categories</p>
            <ul className="list">
              {props.childCategories.map((cat) => (
                <li key={cat.key} className="list__item">
                  <Link className="list__link" to={`${cat.key}`}>
                    {cat.name[Languages.ENGLISH]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {props.filters?.map((filter) => (
          <div>
            <p>{filter.name}</p>
            <ul className="list">
              {filter.values.map((value) => (
                <li key={value} className="list__item">
                  <label>
                    <input type="checkbox"></input>
                    {value}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
