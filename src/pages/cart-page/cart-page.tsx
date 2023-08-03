import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CartList from '../../components/cart-page/cart-list/cart-list';
import CartPromoForm from '../../components/forms/cart-promo-form/cart-promo-form';
import CartOrder from '../../components/cart-page/cart-order/cart-order';
import RemoveFromCartModal from '../../components/modals/remove-from-cart-modal/remove-from-cart-modal';

function CartPage(): JSX.Element {
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
    </main>
  );
}

export default CartPage;
