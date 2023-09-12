import './NonExistingProducts.scss';
import { FC } from 'react';
import NonExistingImage from '../../../../assets/img/Cat-Gif2.gif';
import { headingText, paragraphText } from '../../../types/elementsText';

interface NonExistentCategoryProps {}

const NonExistentProducts: FC<NonExistentCategoryProps> = () => {
  return (
    <div className="wrapper">
      <img className="non-existent-image" src={NonExistingImage} />
      <h3 className="heading non-existing__heading">
        {headingText.NOT_FOUND_PRODUCT_HEADING}
      </h3>
      <p className="text non-existing__text">
        {paragraphText.NOT_FOUND_PRODUCT_PARAGRAPH}
      </p>
    </div>
  );
};

export default NonExistentProducts;
