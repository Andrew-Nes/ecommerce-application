import { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

interface SearchFormProps {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const SearchForm: FC<SearchFormProps> = (props: SearchFormProps) => {
  const { register, handleSubmit, getValues } = useForm({
    mode: 'onSubmit',
    defaultValues: { search: props.searchText },
  });
  const onSubmit = () => {
    props.setSearchText(getValues().search);
  };

  return (
    <form className="cards__form_search" onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input
          type="text"
          {...register('search')}
          className="search-form__input"
        />
      </label>
      <button type="submit" className="button search-form__button">
        🔍
      </button>
    </form>
  );
};

export default SearchForm;
