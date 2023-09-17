import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Filters, filtersCheckboxes } from '../../../types/categoryTypes';

interface SidebarFormProps {
  filters: Filters[];
  setFilters: Dispatch<SetStateAction<filtersCheckboxes>>;
  isNew: boolean;
}

const SidebarForm: FC<SidebarFormProps> = (props: SidebarFormProps) => {
  const { register, getValues, reset } = useForm({ mode: 'onChange' });
  const onChange = () => {
    props.setFilters(getValues());
  };

  useEffect(() => {
    if (props.isNew) {
      reset();
    }
  });

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
        <div
          className="sidebar__block sidebar__block_close"
          key={'price'}
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
          <h4 className="sidebar__heading heading">{'price'}</h4>
          <div className="sidebar__variants">
            <label className="sidebar__label label" key={'1-200'}>
              <input
                {...register(`price`)}
                type="checkbox"
                value={'1 - 200'}
                multiple={true}
                className="checkbox sidebar__checkbox"
              />
              {'$1 - $200'}
            </label>
            <label className="sidebar__label label" key={'201-400'}>
              <input
                {...register(`price`)}
                type="checkbox"
                value={'201 - 400'}
                multiple={true}
                className="checkbox sidebar__checkbox"
              />
              {'$201 - $400'}
            </label>
            <label className="sidebar__label label" key={'401-600'}>
              <input
                {...register(`price`)}
                type="checkbox"
                value={'401 - 600'}
                multiple={true}
                className="checkbox sidebar__checkbox"
              />
              {'$401 - $600'}
            </label>
            <label className="sidebar__label label" key={'601-800'}>
              <input
                {...register(`price`)}
                type="checkbox"
                value={'601 - 800'}
                multiple={true}
                className="checkbox sidebar__checkbox"
              />
              {'$601 - $800'}
            </label>
            <label className="sidebar__label label" key={'801-1000'}>
              <input
                {...register(`price`)}
                type="checkbox"
                value={'801 - 1000'}
                multiple={true}
                className="checkbox sidebar__checkbox"
              />
              {'$801 - $1000'}
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SidebarForm;
