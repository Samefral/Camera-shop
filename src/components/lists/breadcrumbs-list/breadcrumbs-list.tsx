import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { getCamera } from '../../../store/cameras-data/selectors';
import { AppRoute } from '../../../const';

function BreadcrumbsList(): JSX.Element {
  const camera = useAppSelector(getCamera);

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
        <span className="breadcrumbs__link breadcrumbs__link--active">{camera.name}</span>
      </li>
    </ul>
  );
}

export default BreadcrumbsList;
