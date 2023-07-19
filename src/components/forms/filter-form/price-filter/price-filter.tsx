import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';
import { getfilteredCameras } from '../../../../store/cameras-data/selectors';
import { CamerasFilters } from '../../../../const';
import useGetFilterParams from '../../../../hooks/useGetFilterParams';

function PriceFilter(): JSX.Element {
  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const minPriceInputElement = minPriceInputRef.current as HTMLInputElement;
  const maxPriceInputRef = useRef<HTMLInputElement>(null);
  const maxPriceInputElement = maxPriceInputRef.current as HTMLInputElement;

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

    if (filterName === CamerasFilters.Price.maxParamName && valueInNumber < currentFilters.minPrice) {
      return;
    }

    searchParams.set(filterName, evt.currentTarget.value);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleMinPriceBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) > 0) {
      if (Number(evt.target.value) < minPossiblePrice) {
        evt.target.value = String(minPossiblePrice);
        searchParams.set(CamerasFilters.Price.minParamName, String(minPossiblePrice));
      }
      if (currentFilters.maxPrice && Number(maxPriceInputElement.value) < Number(evt.target.value)) {
        maxPriceInputElement.value = evt.target.value;
        searchParams.set(CamerasFilters.Price.maxParamName, maxPriceInputElement.value);
      }
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  const handleMaxPriceBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) > 0) {
      if (Number(evt.currentTarget.value) < currentFilters.minPrice) {
        evt.target.value = String(currentFilters.minPrice);
        searchParams.set(CamerasFilters.Price.maxParamName, String(currentFilters.minPrice));
      }
      if (currentFilters.maxPrice > maxPossiblePrice) {
        evt.target.value = String(maxPossiblePrice);
        searchParams.set(CamerasFilters.Price.maxParamName, String(maxPossiblePrice));
      }
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }

  };

  const handleMinPriceWheel = () => minPriceInputElement.blur();
  const handleMaxPriceWheel = () => maxPriceInputElement.blur();

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              ref={minPriceInputRef}
              placeholder={!isFinite(minPossiblePrice) ? 'от' : `${minPossiblePrice}`}
              onInput={(evt) => onPriceInput(evt, CamerasFilters.Price.minParamName)}
              onBlur={handleMinPriceBlur}
              onWheel={handleMinPriceWheel}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              ref={maxPriceInputRef}
              placeholder={!isFinite(maxPossiblePrice) ? 'до' : `${maxPossiblePrice}`}
              onInput={(evt) => onPriceInput(evt, CamerasFilters.Price.maxParamName)}
              onBlur={handleMaxPriceBlur}
              onWheel={handleMaxPriceWheel}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
