import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCamerasDataLoadingStatus } from '../../store/cameras-data/selectors';
import { AppRoute } from '../../const';
import SearchForm from '../forms/search-form/search-form';

function Header(): JSX.Element {
  const isCamerasLoading = useAppSelector(getCamerasDataLoadingStatus);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Root}>Каталог</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Guarantees}>Гарантии</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Delivery}>Доставка</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.About}>О компании</Link>
            </li>
          </ul>
        </nav>
        <SearchForm isCamerasLoading={isCamerasLoading}/>
        <Link className="header__basket-link" data-testid="basket-link" to={AppRoute.Cart}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default Header;
