import { useLocation } from 'react-router-dom';

export function useGetParamsPath() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  return searchParams.toString();
}

