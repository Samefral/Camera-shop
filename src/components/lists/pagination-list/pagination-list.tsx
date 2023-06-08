import { Link, generatePath } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { getCameras } from '../../../store/cameras-data/selectors';
import { AppRoute, CAMERAS_PER_PAGE } from '../../../const';
import PaginationItem from './pagination-item/pagination-item';

function PaginationList(): JSX.Element {
  const currentPage = Number(useParams().page);
  const cameras = useAppSelector(getCameras);

  const pagesCount = Math.ceil(cameras.length / CAMERAS_PER_PAGE);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <ul className="pagination__list">
      {currentPage !== 1 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.Catalog, { page: `${currentPage - 1}` })}
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
            <PaginationItem key={page} pageNumber={page} isActive={currentPage === page} />
          )
      }
      {currentPage !== pagesCount &&
        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to={generatePath(AppRoute.Catalog, { page: `${currentPage + 1}` })}
          >
            Далее
          </Link>
        </li>}
    </ul>
  );
}

export default PaginationList;
