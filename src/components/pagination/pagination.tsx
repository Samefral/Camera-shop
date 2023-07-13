import { Link, generatePath } from 'react-router-dom';
import { Cameras } from '../../types/camera';
import { AppRoute, CAMERAS_PER_PAGE } from '../../const';
import PaginationItem from './pagination-item/pagination-item';

type PaginationProps = {
  cameras: Cameras;
  currentPage: number;
  currentSortType: string;
  currentSortOrder: string;
}

function Pagination({cameras, currentPage, currentSortType, currentSortOrder}: PaginationProps): JSX.Element {
  const pagesCount = Math.ceil(cameras.length / CAMERAS_PER_PAGE);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const getBtnPath = (page: number) => currentSortType ? `${generatePath(AppRoute.Catalog,
    { page: `${page}` })}/${currentSortType}/${currentSortOrder}` :
    generatePath(AppRoute.Catalog, { page: `${page}` });

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={getBtnPath(currentPage - 1)}
            >
              Назад
            </Link>
          </li>}
        {
          pages.length === 0
            ?
            null
            :
            pages.map((page) =>
              (
                <PaginationItem
                  key={page}
                  pageNumber={page}
                  sortType={currentSortType}
                  sortOrder={currentSortOrder}
                  isActive={currentPage === page}
                />
              )
            )
        }
        {currentPage !== pagesCount &&
        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to={getBtnPath(currentPage + 1)}
          >
            Далее
          </Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
