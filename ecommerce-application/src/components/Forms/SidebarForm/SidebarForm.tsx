import { useForm } from 'react-hook-form';

interface Filters {
  name: string;
  values: string[];
}

interface Props {
  filters: Filters[];
}

const SidebarForm = (props: Props) => {
  const { register, getValues } = useForm({ mode: 'onChange' });
  const onChange = () => {
    console.log(getValues());
  };
  return (
    <div className="sidebar__element">
      <form onChange={onChange}>
        {props.filters.map((filter) => (
          <div
            className="sidebar__block sidebar__block_close"
            key={filter.name}
            onClick={(event) =>
              event.currentTarget.classList.toggle('sidebar__block_close')
            }
          >
            <div className="sidebar__block__mark"></div>
            <h4 className="sidebar__heading heading">{filter.name}</h4>
            <div className="sidebar__variants">
              {filter.values.map((value) => (
                <label className="sidebar__label label" key={value}>
                  <input
                    {...register(`${filter.name}`)}
                    type="checkbox"
                    value={value}
                    multiple={true}
                    className="checkbox sidebar__checkbox"
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default SidebarForm;
