import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import PromoBanner from '../../components/promo-banner/promo-banner';
import FilterForm from '../../components/forms/filter-form/filter-form';
import SortForm from '../../components/forms/sort-form/sort-form';
import MainCamerasList from '../../components/cameras-lists/main-cameras-list/main-cameras-list';
import Pagination from '../../components/pagination/pagination';

function CatalogPage(): JSX.Element {
  return (
    <main>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <PromoBanner />
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Root} >
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
                <Pagination />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CatalogPage;
