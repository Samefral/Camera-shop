import CartItem from './cart-item/cart-item';

function CartList(): JSX.Element {
  return (
    <ul className="basket__list">
      <CartItem />
      <li className="basket-item">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x" />
            <img
              src="img/content/img1.jpg"
              srcSet="img/content/img1@2x.jpg 2x"
              width="140"
              height="120"
              alt="Ретрокамера «Das Auge IV»"
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">Ретрокамера «Das Auge IV»</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>
              <span className="basket-item__number">DA4IU67AD5</span>
            </li>
            <li className="basket-item__list-item">Коллекционная видеокамера</li>
            <li className="basket-item__list-item">Любительский уровень</li>
          </ul>
        </div>
        <p className="basket-item__price">
          <span className="visually-hidden">Цена:</span>73 450 ₽
        </p>
        <div className="quantity">
          <button className="btn-icon btn-icon--prev" disabled aria-label="уменьшить количество товара">
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <label className="visually-hidden" htmlFor="counter2"></label>
          <input type="number" id="counter2" value="1" min="1" max="99" aria-label="количество товара" />
          <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>73 450 ₽</div>
        <button className="cross-btn" type="button" aria-label="Удалить товар">
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </li>
    </ul>
  );
}

export default CartList;
