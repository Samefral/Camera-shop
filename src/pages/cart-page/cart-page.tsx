import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CartList from '../../components/cart-page/cart-list/cart-list';
import CartPromo from '../../components/cart-page/cart-promo/cart-promo';

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
              <div className="basket__summary-order">
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Всего:</span>
                  <span className="basket__summary-value">111 390 ₽</span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Скидка:</span>
                  <span className="basket__summary-value basket__summary-value--bonus">0 ₽</span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                  <span className="basket__summary-value basket__summary-value--total">111 390 ₽</span>
                </p>
                <button className="btn btn--purple" type="submit">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CartPage;
