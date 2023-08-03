import React, { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getCartCouponError, getCartCouponSuccess } from '../../../store/cart-data/selectors';
import { fetchDiscount } from '../../../store/api-actions';
import { setCouponError, setCouponSuccess } from '../../../store/cart-data/cart-data';

function CartPromoForm(): JSX.Element {
  const promoInputRef = useRef<HTMLInputElement>(null);
  const isInvalidPromo = useAppSelector(getCartCouponError);
  const isValidPromo = useAppSelector(getCartCouponSuccess);

  let customInputClassName = 'custom-input';

  if (isInvalidPromo) {
    customInputClassName = 'is-invalid custom-input';
  } else if (isValidPromo) {
    customInputClassName = 'is-valid custom-input';
  }

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(fetchDiscount(promoInputRef.current?.value as string));
  };

  const handleInputFocus = () => {
    dispatch(setCouponError(false));
    dispatch(setCouponSuccess(false));
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (promoInputRef.current) {
      promoInputRef.current.value = evt.target.value.trim();
    }
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form onSubmit={handleSubmit} action="#">
          <div className={customInputClassName}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                ref={promoInputRef}
                type="text"
                name="promo"
                placeholder="Введите промокод"
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit">
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartPromoForm;
