import { useNavigate, useLocation } from 'react-router-dom';
import { CamerasFilters } from '../../../const';
import useGetFilterParams from '../../../hooks/useGetFilterParams';
import PriceFilter from './price-filter/price-filter';

function FilterForm(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentFilters = useGetFilterParams();

  const isFilterChecked = (paramName: string, paramValue: string) => searchParams.getAll(paramName).includes(paramValue);

  const deleteParam = (paramName: string, paramValue: string) => {
    const result: string[] = [];

    searchParams.forEach((value, key) => {
      if (key === paramName && value === paramValue) {
        return;
      }
      result.push(`${key}=${value}`);
    });

    navigate(`?${ result.join('&')}`, { replace: true });
  };

  const addParam = (filterName: string, filterValue: string) => {
    searchParams.append(filterName, filterValue);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const onFilterChange = (evt: React.ChangeEvent<HTMLInputElement>, filterName: string, filterValue: string, isSingleChoice?: boolean) => {
    if (isSingleChoice) {
      if (evt.currentTarget.checked) {
        searchParams.set(filterName, filterValue);
      } else {
        searchParams.delete(filterName);
      }
      navigate(`${location.pathname}?${searchParams.toString()}`);
      return;
    }
    if (evt.currentTarget.checked) {
      addParam(filterName, filterValue);
    } else {
      deleteParam(filterName, filterValue);
    }
  };

  return (
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <PriceFilter />
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Категория</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="photocamera"
              checked={isFilterChecked(CamerasFilters.Category.paramName, CamerasFilters.Category.values.photo)}
              onChange={(evt) => onFilterChange(evt, CamerasFilters.Category.paramName, CamerasFilters.Category.values.photo, true)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Фотокамера</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="videocamera"
              checked={isFilterChecked(CamerasFilters.Category.paramName, CamerasFilters.Category.values.video)}
              onChange={(evt) => onFilterChange(evt, CamerasFilters.Category.paramName, CamerasFilters.Category.values.video, true)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Видеокамера</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Тип камеры</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="digital"
              checked={isFilterChecked(CamerasFilters.Type.paramName, CamerasFilters.Type.values.digital)}
              onChange={(evt) => onFilterChange(evt, CamerasFilters.Type.paramName, CamerasFilters.Type.values.digital)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Цифровая</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="film"
              checked={isFilterChecked(CamerasFilters.Type.paramName, CamerasFilters.Type.values.film)}
              onChange={(evt) => onFilterChange(evt, CamerasFilters.Type.paramName, CamerasFilters.Type.values.film)}
              disabled={currentFilters.category === CamerasFilters.Category.values.video}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Плёночная</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="snapshot"
              checked={isFilterChecked(CamerasFilters.Type.paramName, CamerasFilters.Type.values.instant)}
              onChange={(evt) => onFilterChange(evt, CamerasFilters.Type.paramName, CamerasFilters.Type.values.instant)}
              disabled={currentFilters.category === CamerasFilters.Category.values.video}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Моментальная</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="collection"
              checked={isFilterChecked(CamerasFilters.Type.paramName, CamerasFilters.Type.values.collection)}
              onChange={(evt) => onFilterChange(evt, CamerasFilters.Type.paramName, CamerasFilters.Type.values.collection)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Коллекционная</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Уровень</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="zero"
              checked={isFilterChecked(CamerasFilters.Level.paramName, CamerasFilters.Level.values.zero)}
              onChange={(evt) => onFilterChange(evt, CamerasFilters.Level.paramName, CamerasFilters.Level.values.zero)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Нулевой</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="non-professional"
              checked={isFilterChecked(CamerasFilters.Level.paramName, CamerasFilters.Level.values.amateur)}
              onChange={(evt) => onFilterChange(evt, CamerasFilters.Level.paramName, CamerasFilters.Level.values.amateur)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Любительский</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="professional"
              checked={isFilterChecked(CamerasFilters.Level.paramName, CamerasFilters.Level.values.professional)}
              onChange={(evt) => onFilterChange(evt, CamerasFilters.Level.paramName, CamerasFilters.Level.values.professional)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Профессиональный</span>
          </label>
        </div>
      </fieldset>
      <button onClick={() => navigate('')} className="btn catalog-filter__reset-btn" type="reset">
        Сбросить фильтры
      </button>
    </form>
  );
}

export default FilterForm;
