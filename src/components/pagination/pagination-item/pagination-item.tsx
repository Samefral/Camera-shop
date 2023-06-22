import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../../const';

type PaginationItemProps = {
  pageNumber: number;
  isActive: boolean;
}

function PaginationItem({pageNumber, isActive}: PaginationItemProps): JSX.Element {
  const paginationItemClassName = isActive ? 'pagination__link pagination__link--active' : 'pagination__link';

  return (
    <li className="pagination__item">
      <Link className={paginationItemClassName} to={generatePath(AppRoute.Catalog, { page: `${pageNumber}` })}>{pageNumber}</Link>
    </li>
  );
}

export default PaginationItem;
