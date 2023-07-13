import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';
import { getfilteredCameras } from '../../../../store/cameras-data/selectors';
import { CamerasFilters } from '../../../../const';
import useGetFilterParams from '../../../../hooks/useGetFilterParams';

function PriceFilter(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentFilters = useGetFilterParams();

  const filteredCameras = useAppSelector(getfilteredCameras)(currentFilters, false);
  const prices = filteredCameras.map((camera) => camera.price);
  const maxPossiblePrice = Math.max(...prices);
  const minPossiblePrice = Math.min(...prices);

  const onPriceInput = (evt: React.FormEvent<HTMLInputElement>, filterName: string) => {
    const valueInString = evt.currentTarget.value;
    const valueInNumber = Number(evt.currentTarget.value);

    if (valueInNumber <= 0 || valueInString === '-') {
      evt.currentTarget.value = '';
      searchParams.delete(filterName);
      navigate(`${location.pathname}?${searchParams.toString()}`);
      return;
    }

    if (valueInNumber < minPossiblePrice) {
      return;
    }

    searchParams.set(filterName, evt.currentTarget.value);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleMinPriceBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (currentFilters.minPrice < minPossiblePrice && Number(evt.target.value) > 0) {
      evt.target.value = String(minPossiblePrice);
      searchParams.set(CamerasFilters.Price.minParamName, String(minPossiblePrice));
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  const handleMaxPriceBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) > 0) {
      if (Number(evt.currentTarget.value) < minPossiblePrice) {
        evt.target.value = String(minPossiblePrice);
        searchParams.set(CamerasFilters.Price.maxParamName, String(minPossiblePrice));
        navigate(`${location.pathname}?${searchParams.toString()}`);
      }
      if (currentFilters.maxPrice > maxPossiblePrice) {
        evt.target.value = String(maxPossiblePrice);
        searchParams.set(CamerasFilters.Price.maxParamName, String(maxPossiblePrice));
        navigate(`${location.pathname}?${searchParams.toString()}`);
      }
    }

  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={!isFinite(minPossiblePrice) ? 'от' : `от ${minPossiblePrice}`}
              onInput={(evt) => onPriceInput(evt, CamerasFilters.Price.minParamName)}
              onBlur={handleMinPriceBlur}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={!isFinite(maxPossiblePrice) ? 'до' : `до ${maxPossiblePrice}`}
              onInput={(evt) => onPriceInput(evt, CamerasFilters.Price.maxParamName)}
              onBlur={handleMaxPriceBlur}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
