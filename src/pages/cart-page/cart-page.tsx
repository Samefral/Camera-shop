import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CartList from '../../components/cart-page/cart-list/cart-list';
import CartPromo from '../../components/cart-page/cart-promo/cart-promo';
import CartOrder from '../../components/cart-page/cart-order/cart-order';

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
              <CartPromo />
              <CartOrder />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CartPage;
