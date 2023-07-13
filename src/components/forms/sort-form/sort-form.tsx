import { useNavigate, useParams, generatePath } from 'react-router-dom';
import { useGetParamsPath } from '../../../hooks/useGetParamsPath';
import { AppRoute } from '../../../const';

function SortForm(): JSX.Element {
  const navigate = useNavigate();
  const paramsPath = useGetParamsPath();

  const page = Number(useParams().page);
  const currentPage = page ? page : 1;
  const currentSortType = useParams().sortType as string;
  const currentSortOrder = useParams().sortOrder as string;

  const getSortTypePath = (sortType: string) => `${generatePath(AppRoute.Catalog,
    { page: `${currentPage}` })}/${sortType}/${!currentSortOrder ? AppRoute.CatalogSortUpOrder : currentSortOrder}?${paramsPath}`;

  const getSortOrderPath = (sortOrder: string) => `${generatePath(AppRoute.Catalog,
    { page: `${currentPage}` })}/${!currentSortType ? AppRoute.CatalogSortPriceType : currentSortType}/${sortOrder}?${paramsPath}`;

  return (
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">
          <div className="catalog-sort__btn-text">
            <input
              type="radio"
              id="sortPrice"
              name="sort"
              onChange={() => navigate(getSortTypePath(AppRoute.CatalogSortPriceType))}
              checked={currentSortType === AppRoute.CatalogSortPriceType}
            />
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div className="catalog-sort__btn-text">
            <input
              type="radio"
              id="sortPopular"
              name="sort"
              onChange={() => navigate(getSortTypePath(AppRoute.CatalogSortPopupularType))}
              checked={currentSortType === AppRoute.CatalogSortPopupularType}
            />
            <label htmlFor="sortPopular">по популярности</label>
          </div>
        </div>
        <div className="catalog-sort__order">
          <div className="catalog-sort__btn catalog-sort__btn--up">
            <input
              type="radio"
              id="up"
              name="sort-icon"
              aria-label="По возрастанию"
              onChange={() => navigate(getSortOrderPath(AppRoute.CatalogSortUpOrder))}
              checked={currentSortOrder === AppRoute.CatalogSortUpOrder}
            />
            <label htmlFor="up">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
          <div className="catalog-sort__btn catalog-sort__btn--down">
            <input
              type="radio"
              id="down"
              name="sort-icon"
              aria-label="По убыванию"
              onChange={() => navigate(getSortOrderPath(AppRoute.CatalogSortDownOrder))}
              checked={currentSortOrder === AppRoute.CatalogSortDownOrder}
            />
            <label htmlFor="down">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SortForm;
