import { Link, generatePath } from 'react-router-dom';
import { useGetParamsPath } from '../../../hooks/useGetParamsPath';
import { AppRoute } from '../../../const';

type PaginationItemProps = {
  pageNumber: number;
  sortType: string;
  sortOrder: string;
  isActive: boolean;
}

function PaginationItem({pageNumber, sortType, sortOrder, isActive}: PaginationItemProps): JSX.Element {
  const paramsPath = useGetParamsPath();

  const paginationItemClassName = isActive ? 'pagination__link pagination__link--active' : 'pagination__link';

  const path = sortType ?
    `${generatePath(AppRoute.Catalog, { page: `${pageNumber}` })}/${sortType}/${sortOrder}?${paramsPath}`
    : `${generatePath(AppRoute.Catalog, { page: `${pageNumber}` })}?${paramsPath}`;

  return (
    <li className="pagination__item" data-testid="pagination-link">
      <Link className={paginationItemClassName} to={path}>{pageNumber}</Link>
    </li>
  );
}

export default PaginationItem;
