import './sidebar.scss';
import { Category } from '@commercetools/platform-sdk';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Languages } from '../../types/commonDataTypes';
import Slider from 'react-slider';
import SidebarForm from '../Forms/SidebarForm/SidebarForm';

interface Filters {
  name: string;
  values: string[];
}

interface filtersCheckboxes {
  [key: string]: string[];
}

interface SidebarProps {
  childCategories?: Category[];
  filters?: Filters[];
  prices?: [number, number];
  setFilters: Dispatch<SetStateAction<filtersCheckboxes>>;
  setPrice: Dispatch<SetStateAction<[number, number] | undefined>>;
  priceRange: [number, number] | undefined;
}

const Sidebar: FC<SidebarProps> = (props: SidebarProps) => {
  const [values, setValues] = useState<[number, number]>(
    props.prices || [0, 10]
  );

  useEffect(() => {
    setValues(props.prices || [0, 10]);
  }, [props]);

  return (
    <div className="sidebar">
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
        {props.filters && (
          <SidebarForm
            filters={props.filters}
            setFilters={props.setFilters}
            prices={props.prices}
          />
        )}
        {props.prices && (
          <div>
            <p>Price</p>
            <p>{`$${values[0]} - $${values[1]}`}</p>
            <Slider
              className="slider_price"
              onChange={(newValues) => {
                setValues(newValues);
                props.setPrice(newValues);
              }}
              value={values}
              defaultValue={props.priceRange}
              min={props.prices[0]}
              max={props.prices[1]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
