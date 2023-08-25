import { Link } from 'react-router-dom';
import { BreadcrumbsItem } from '../types/breadcrumbsTypes';

interface BreadcrumbsListProps {
  items: BreadcrumbsItem[];
}

export default function BreadcrumbsList(props: BreadcrumbsListProps) {
  return (
    <ul className="breadcrumbs list">
      {props.items.map((item) => (
        <li
          className={`list__item breadcrumbs__item ${item.listClassName}`}
          key={item.key}
        >
          <Link
            className={`breadcrumbs__list ${item.linkClassName}`}
            to={item.route}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
