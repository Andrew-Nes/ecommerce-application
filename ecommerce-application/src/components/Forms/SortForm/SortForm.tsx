import { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { SortingVariants } from '../../../types/formTypes';

interface SortFormProps {
  setSorting: Dispatch<SetStateAction<string>>;
  sortString: string;
}

const SortForm: FC<SortFormProps> = (props: SortFormProps) => {
  const { register, getValues } = useForm({ mode: 'onChange' });
  const onChange = () => {
    props.setSorting(getValues().sort);
  };

  return (
    <form className="cards__form" onChange={onChange}>
      <p className="text">Sort by:</p>
      <select
        className="cards__form__select"
        value={props.sortString}
        {...register(`sort`)}
      >
        <option value={SortingVariants.NAME_ASC}>{'Name A-Z'}</option>
        <option value={SortingVariants.NAME_DESC}>{'Name Z-A'}</option>
        <option value={SortingVariants.PRICE_ASC}>{'Price low to high'}</option>
        <option value={SortingVariants.PRICE_DESC}>
          {'Price high to low'}
        </option>
      </select>
    </form>
  );
};

export default SortForm;
