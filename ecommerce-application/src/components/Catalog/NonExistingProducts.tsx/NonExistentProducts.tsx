import './NonExistingProducts.scss';
import { FC } from 'react';
import NonExistingImage from '../../../../assets/img/Cat-Gif2.gif';

interface NonExistentCategoryProps {}

const NonExistentProducts: FC<NonExistentCategoryProps> = () => {
  return (
    <div className="wrapper">
      <img className="non-existent-image" src={NonExistingImage} />
      <h3 className="heading non-existing__heading">What a Cat-astrophe!</h3>
      <p className="text non-existing__text">
        We looked everywhere and we couldn't find products matching the
        selection..
      </p>
    </div>
  );
};

export default NonExistentProducts;
