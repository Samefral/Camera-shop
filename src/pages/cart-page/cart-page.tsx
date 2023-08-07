import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { getCartCameras, getCartOrderStatus } from '../../store/cart-data/selectors';
import { OrderStatus } from '../../const';
import EmptyCartPage from './empty-cart-page/empty-cart-page';
import ErrorCartPage from './error-cart-page/error-cart-page';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CartList from '../../components/cart-page/cart-list/cart-list';
import CartPromoForm from '../../components/forms/cart-promo-form/cart-promo-form';
import CartOrder from '../../components/cart-page/cart-order/cart-order';
import RemoveFromCartModal from '../../components/modals/remove-from-cart-modal/remove-from-cart-modal';
import OrderSuccessModal from '../../components/modals/order-success-modal/order-success-modal';

function CartPage(): JSX.Element {
  const cartCameras = useAppSelector(getCartCameras);
  const orderStatus = useAppSelector(getCartOrderStatus);

  if (cartCameras.length === 0) {
    return <EmptyCartPage />;
  }

  if (orderStatus === OrderStatus.Rejected) {
    return <ErrorCartPage />;
  }

  return (
    <main>
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>
      <div className="page-content">
        <Breadcrumbs crumbName='Корзина'/>
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <CartList />
            <div className="basket__summary">
              <CartPromoForm />
              <CartOrder />
            </div>
          </div>
        </section>
      </div>
      <RemoveFromCartModal />
      <OrderSuccessModal />
    </main>
  );
}

export default CartPage;
