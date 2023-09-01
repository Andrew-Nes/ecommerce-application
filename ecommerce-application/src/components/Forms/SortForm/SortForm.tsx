import { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

interface SortFormProps {
  setSorting: Dispatch<SetStateAction<string>>;
  sortString: string;
}

const SortForm: FC<SortFormProps> = (props: SortFormProps) => {
  const { register, getValues } = useForm({ mode: 'onChange' });
  const onChange = () => {
    console.log('SORT', getValues());
    props.setSorting(getValues().sort);
  };

  console.log(getValues());

  return (
    <form className="cards__form" onChange={onChange}>
      <p className="text">Sort by:</p>
      <select
        className="cards__form__select"
        value={props.sortString}
        {...register(`sort`)}
      >
        <option value="name.en-US asc">{'Name A-Z'}</option>
        <option value="name.en-US desc">{'Name Z-A'}</option>
        <option value="price asc">{'Price low to high'}</option>
        <option value="price desc">{'Price high to low'}</option>
      </select>
    </form>
  );
};

export default SortForm;
