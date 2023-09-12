import { Outlet } from 'react-router-dom';
import { FC } from 'react';

const CategoryComponent: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default CategoryComponent;
