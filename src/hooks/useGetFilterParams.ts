import { useLocation } from 'react-router-dom';
import { CamerasFilters } from '../const';

function useGetFilterParams() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get(CamerasFilters.Category.paramName);
  const currentTypes = searchParams.getAll(CamerasFilters.Type.paramName);
  const currentLevels = searchParams.getAll(CamerasFilters.Level.paramName);
  const currentMinPrice = Number(searchParams.get(CamerasFilters.Price.minParamName));
  const currentMaxPrice = Number(searchParams.get(CamerasFilters.Price.maxParamName));

  const filterParams = {
    category: currentCategory,
    types: currentTypes,
    levels: currentLevels,
    minPrice: currentMinPrice,
    maxPrice: currentMaxPrice,
  };

  return filterParams;
}

export default useGetFilterParams;
