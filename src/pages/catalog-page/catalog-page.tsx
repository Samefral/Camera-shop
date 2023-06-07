import { Link } from 'react-router-dom';
import PromoBanner from '../../components/promo-banner/promo-banner';
import FilterForm from '../../components/forms/filter-form/filter-form';
import SortForm from '../../components/forms/sort-form/sort-form';
import MainCamerasList from '../../components/lists/cameras-lists/main-cameras-list/main-cameras-list';
import PaginationList from '../../components/lists/pagination-list/pagination-list';

function CatalogPage(): JSX.Element {
  return (
    <main>
      <PromoBanner />
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to="index.html">
                  Главная
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
              </li>
            </ul>
          </div>
        </div>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">
              Каталог фото- и видеотехники
            </h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <div className="catalog-filter">
                  <FilterForm />
                </div>
              </div>
              <div className="catalog__content">
                <div className="catalog-sort">
                  <SortForm />
                </div>
                <MainCamerasList />
                <div className="pagination">
                  <PaginationList />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CatalogPage;
