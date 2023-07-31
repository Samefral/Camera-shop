import { useAppDispatch } from '../../../../hooks';
import { addCameraToCart, decreaseCameraCount, removeCameraFromCart } from '../../../../store/cart-data/cart-data';
import { Camera } from '../../../../types/camera';
import { getCameraCategoryInText, formatPrice } from '../../../../utils/utils';
import { MAX_CART_ITEM_COUNT } from '../../../../const';

type CartItemProps = {
  camera: Camera;
}

function CartItem({camera}: CartItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleIncreaseBtnClick = () => {
    dispatch(addCameraToCart(camera));
  };

  const handleDecreaseBtnClick = () => {
    dispatch(decreaseCameraCount(camera));
  };

  const handleDeleteBtnClick = () => {
    dispatch(removeCameraFromCart(camera));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`}
          />
          <img
            src={camera.previewImg}
            srcSet={camera.previewImg2x}
            width="140"
            height="120"
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{camera.type} {getCameraCategoryInText(camera.category)}</li>
          <li className="basket-item__list-item">{camera.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)}
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleDecreaseBtnClick}
          disabled={camera.count === 1}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter2"></label>
        <input type="number" id="counter2" value={camera.count} min="1" max="99" aria-label="количество товара" />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleIncreaseBtnClick}
          disabled={camera.count === MAX_CART_ITEM_COUNT}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{camera.count * camera.price}
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleDeleteBtnClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default CartItem;
