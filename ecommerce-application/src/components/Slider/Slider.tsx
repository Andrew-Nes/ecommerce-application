import { FC, useState } from 'react';
import './slider.scss';
import { Image } from '@commercetools/platform-sdk';
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';
import { Inline } from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/styles.css';

const Slider: FC<{ sliderImages: Image[] | undefined }> = (props) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const toggleOpen = (state: boolean) => () => setOpen(state);

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current);

  const images: SlideImage[] | undefined = props.sliderImages?.map((el) => {
    return {
      src: el.url,
      width: el.dimensions.w,
      height: el.dimensions.h,
    };
  });
  return (
    <div className="product-page__slider">
      <Lightbox
        index={index}
        slides={images}
        plugins={[Inline]}
        on={{
          view: updateIndex,
          click: toggleOpen(true),
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: 'cover',
        }}
        inline={{
          style: {
            width: '100%',
            maxWidth: '800px',
            aspectRatio: '3 / 2',
            margin: '0 auto',
          },
        }}
      />

      <Lightbox
        open={open}
        close={toggleOpen(false)}
        index={index}
        slides={images}
        on={{ view: updateIndex }}
        animation={{ fade: 0 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      />
    </div>
  );
};

export default Slider;
