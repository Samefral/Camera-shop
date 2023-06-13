import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

function BreadcrumbsList(): JSX.Element {
  return (
    <ul className="breadcrumbs__list">
      <li className="breadcrumbs__item">
        <Link className="breadcrumbs__link" to={AppRoute.Root}>
          Главная
          <svg width="5" height="8" aria-hidden="true">
            <use xlinkHref="#icon-arrow-mini"></use>
          </svg>
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="breadcrumbs__link" to={AppRoute.Root}>
          Каталог
          <svg width="5" height="8" aria-hidden="true">
            <use xlinkHref="#icon-arrow-mini"></use>
          </svg>
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <span className="breadcrumbs__link breadcrumbs__link--active">Ретрокамера Das Auge IV</span>
      </li>
    </ul>
  );
}

export default BreadcrumbsList;
