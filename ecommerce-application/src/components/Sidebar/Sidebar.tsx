import './sidebar.scss';
import { Category } from '@commercetools/platform-sdk';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Languages } from '../../types/commonDataTypes';
import Slider from 'react-slider';

interface Filters {
  name: string;
  values: string[];
}

interface SidebarProps {
  childCategories?: Category[];
  filters?: Filters[];
  prices?: [number, number];
}

const Sidebar: FC<SidebarProps> = (props: SidebarProps) => {
  const [values, setValues] = useState(props.prices || [0, 10]);

  useEffect(() => {
    setValues(props.prices || [0, 10]);
  }, [props]);

  return (
    <div className="sidebar">
      <div className="sidebar__content">
        {props.childCategories && (
          <div>
            <p>Categories</p>
            <ul className="list">
              {props.childCategories.map((category) => (
                <li key={category.key} className="list__item">
                  <Link className="list__link" to={`${category.key}`}>
                    {category.name[Languages.ENGLISH]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {props.filters?.map((filter) => (
          <div key={filter.name}>
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
        {props.prices && (
          <div>
            <p>Price</p>
            <p>{`$${values[0]} - $${values[1]}`}</p>
            <Slider
              className="slider_price"
              onChange={setValues}
              value={values}
              defaultValue={[props.prices[0], props.prices[1]]}
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
