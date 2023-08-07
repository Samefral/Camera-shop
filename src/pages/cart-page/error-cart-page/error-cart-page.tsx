import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { setOrderStatus } from '../../../store/cart-data/cart-data';
import { AppRoute, OrderStatus } from '../../../const';
import Breadcrumbs from '../../../components/breadcrumbs/breadcrumbs';
import { useAppDispatch } from '../../../hooks';

function ErrorCartPage(): JSX.Element {

  const dispatch = useAppDispatch();

  return (
    <main>
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>
      <div className="page-content">
        <Breadcrumbs crumbName='Корзина' />
        <section className="basket">
          <div className="container" style={{textAlign: 'center'}}>
            <h1>Ошибка при оформлении заказа</h1>
            <Link onClick={() => dispatch(setOrderStatus(OrderStatus.Null))} to={AppRoute.Catalog}>Вернуться к покупкам</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ErrorCartPage;
