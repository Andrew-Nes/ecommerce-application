import { FC } from 'react';
import NonExistingImage from '../../../assets/img/Cat-Gif2.gif';

interface NonExistentCategoryProps {}

const NonExistentCategory: FC<NonExistentCategoryProps> = () => {
  return (
    <div className="wrapper">
      <img className="non-existent-image" src={NonExistingImage} />
      <h3>What a Cat-astrophe!</h3>
      <h4>
        We looked everywhere and we couldn't find the page you were after.
      </h4>
    </div>
  );
};

export default NonExistentCategory;
