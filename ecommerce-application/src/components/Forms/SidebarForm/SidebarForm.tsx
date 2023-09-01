import { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Filters, filtersCheckboxes } from '../../../types/categoryTypes';
// import Slider from 'react-slider';

interface SidebarFormProps {
  filters: Filters[];
  setFilters: Dispatch<SetStateAction<filtersCheckboxes>>;
  prices?: [number, number];
}

const SidebarForm: FC<SidebarFormProps> = (props: SidebarFormProps) => {
  const { register, getValues } = useForm({ mode: 'onChange' });
  const onChange = () => {
    props.setFilters(getValues());
    console.log(getValues());
  };

  // const [values, setValues] = useState(props.prices || [0, 10]);

  // useEffect(() => {
  //   setValues(props.prices || [0, 10]);
  // }, [props]);
  return (
    <div className="sidebar__element">
      <form onChange={onChange}>
        {props.filters &&
          props.filters.map((filter) => (
            <div
              className="sidebar__block sidebar__block_close"
              key={filter.name}
              onClick={(event) => {
                if (event.target instanceof HTMLElement) {
                  if (
                    event.target.tagName === 'INPUT' ||
                    event.target.tagName === 'LABEL'
                  ) {
                    return;
                  }
                  event.currentTarget.classList.toggle('sidebar__block_close');
                }
              }}
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
        {/* {props.prices && (
          <div>
            <p>Price</p>
            <p>{`$${values[0]} - $${values[1]}`}</p>
            <Slider
              className="slider_price"
              onChange={setValues}
              value={values}
              defaultValue={[props.prices[0], props.prices[1]]}
              min={props.prices[0]}
              max={props.prices[1]}
            />
          </div>
        )} */}
      </form>
    </div>
  );
};

export default SidebarForm;
