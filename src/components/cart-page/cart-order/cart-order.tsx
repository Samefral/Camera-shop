import { useAppSelector } from '../../../hooks';
import { getTotalCartPrice, getCartDiscount } from '../../../store/cart-data/selectors';
import { formatPrice } from '../../../utils/utils';

function CartOrder(): JSX.Element {
  const totalPrice = useAppSelector(getTotalCartPrice);
  const discountPercent = useAppSelector(getCartDiscount);
  const discount = Math.round(totalPrice / 100 * discountPercent);

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{formatPrice(totalPrice)}</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className="basket__summary-value basket__summary-value--bonus">{formatPrice(discount)}</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{formatPrice(totalPrice - discount)}</span>
      </p>
      <button className="btn btn--purple" type="submit">
        Оформить заказ
      </button>
    </div>
  );
}

export default CartOrder;
