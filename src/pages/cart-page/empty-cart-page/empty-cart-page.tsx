import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import Breadcrumbs from '../../../components/breadcrumbs/breadcrumbs';
import OrderSuccessModal from '../../../components/modals/order-success-modal/order-success-modal';

function EmptyCartPage(): JSX.Element {

  return (
    <main>
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>
      <div className="page-content">
        <Breadcrumbs crumbName='Корзина' />
        <section className="basket">
          <div className="container" style={{textAlign: 'center'}}>
            <h1>Корзина пуста</h1>
            <Link to={AppRoute.Catalog}>Вернуться к покупкам</Link>
          </div>
        </section>
      </div>
      <OrderSuccessModal />
    </main>
  );
}

export default EmptyCartPage;
