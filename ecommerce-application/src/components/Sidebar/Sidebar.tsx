import './sidebar.scss';
import { Category } from '@commercetools/platform-sdk';
import { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Languages } from '../../types/commonDataTypes';
import SidebarForm from '../Forms/SidebarForm/SidebarForm';
import { Filters, filtersCheckboxes } from '../../types/categoryTypes';

interface SidebarProps {
  childCategories?: Category[];
  filters: Filters[];
  setFilters: Dispatch<SetStateAction<filtersCheckboxes>>;
  isNew: boolean;
}

const Sidebar: FC<SidebarProps> = (props: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar__trigger">filters</div>
      <div className="sidebar__content">
        {props.childCategories && (
          <div
            className="sidebar__element sidebar__block sidebar__block_close"
            onClick={(event) =>
              event.currentTarget.classList.toggle('sidebar__block_close')
            }
          >
            <div className="sidebar__block__mark"></div>
            <h4 className="sidebar__heading heading">categories</h4>
            <ul className="list sidebar__variants">
              {props.childCategories.map((category) => (
                <li key={category.key} className="list__item sidebar__item">
                  <Link
                    className="list__link sidebar__link"
                    to={`${category.key}`}
                  >
                    {category.name[Languages.ENGLISH]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <SidebarForm
          filters={props.filters}
          setFilters={props.setFilters}
          isNew={props.isNew}
        />
      </div>
    </div>
  );
};

export default Sidebar;
