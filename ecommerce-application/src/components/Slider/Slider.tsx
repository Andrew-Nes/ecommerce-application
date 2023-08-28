import { FC, useState } from 'react';
import './slider.scss';
import { Image } from '@commercetools/platform-sdk';

const Slider: FC<{ sliderImages: Image[] | undefined }> = (props) => {
  const [current, setCurrent] = useState(0);
  const length = props.sliderImages ? props.sliderImages.length : 0;
  const imagesArray = props.sliderImages ? props.sliderImages : [];

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(imagesArray) || imagesArray.length <= 0) {
    return null;
  }

  return (
    <div className="slider">
      <button className="slider__arrow left" onClick={prevSlide} />
      <button className="slider__arrow right" onClick={nextSlide} />
      {imagesArray.map((element) => {
        return (
          <div
            className={
              imagesArray.indexOf(element) === current
                ? 'slider__slide active'
                : 'slider__slide'
            }
            key={imagesArray.indexOf(element)}
          >
            {imagesArray.indexOf(element) === current && (
              <img
                src={imagesArray[current].url}
                alt="product image"
                className="product-image"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
