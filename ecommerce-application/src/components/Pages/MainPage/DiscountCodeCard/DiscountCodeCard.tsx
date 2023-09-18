import { DiscountCode } from '@commercetools/platform-sdk';
import { FC } from 'react';
import './discountCodeCard.scss'

interface DiscountCodeCardProps {
  key: number;
  discountCode: DiscountCode;
}

const DiscountCodeCard: FC<DiscountCodeCardProps> = (props) => {
  const discountTitle = Object.values(props.discountCode.name || '')[0];
  const discountDescription = Object.values(
    props.discountCode.description || ''
  )[0];
  const discountCode = props.discountCode.code || '';
  return (
    <div className="discount-code__card">
      <h2 className="discount-code_title">{discountTitle}</h2>
      <p className="discount-code_description">{discountDescription}</p>
      <strong className="discount-code_code">Code: {discountCode}</strong>
    </div>
  );
};

export default DiscountCodeCard;
