import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getCameraInCartModal, getSuccessModalOpenStatus } from '../../../store/cart-data/selectors';
import { setCameraInCartModal, setSuccessModalOpen } from '../../../store/cart-data/cart-data';
import { addCameraToCart } from '../../../store/cart-data/cart-data';
import { formatPrice, getCameraCategoryInText } from '../../../utils/utils';
import { AppRoute } from '../../../const';
import ReactModal from 'react-modal';

function AddToCartModal(): JSX.Element {
  const camera = useAppSelector(getCameraInCartModal);
  const isSuccessModalOpen = useAppSelector(getSuccessModalOpenStatus);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onModalClose = () => {
    dispatch(setCameraInCartModal(null));
    dispatch(setSuccessModalOpen(false));
  };

  const handleModalClose = () => onModalClose();

  const handleAddToCartClick = () => {
    dispatch(addCameraToCart(camera));
    dispatch(setSuccessModalOpen(true));
  };

  const handleLinkToCartClick = () => {
    onModalClose();
    navigate(AppRoute.Cart);
  };

  if (!camera) {
    return <div></div>;
  }

  return (
    <ReactModal
      isOpen
      ariaHideApp={false}
      style={{content: {inset: 'unset'}}}
      bodyOpenClassName='scroll-lock'
      overlayClassName='custom-modal-overlay'
      onRequestClose={handleModalClose}
    >
      <div className={isSuccessModalOpen ? 'modal is-active modal--narrow' : 'modal is-active'}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleModalClose}></div>
          {isSuccessModalOpen ?
            <div className="modal__content">
              <p className="title title--h4">Товар успешно добавлен в корзину</p>
              <svg className="modal__icon" width="86" height="80" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <div className="modal__buttons">
                <Link
                  onClick={handleModalClose}
                  className="btn btn--transparent modal__btn"
                  to={AppRoute.Catalog}
                >
                  Продолжить покупки
                </Link>
                <button
                  className="btn btn--purple modal__btn modal__btn--fit-width"
                  onClick={handleLinkToCartClick}
                >
                  Перейти в корзину
                </button>
              </div>
              <button onClick={handleModalClose} className="cross-btn" type="button" aria-label="Закрыть попап">
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg>
              </button>
            </div>
            :
            <div className="modal__content">
              <p className="title title--h4">Добавить товар в корзину</p>
              <div className="basket-item basket-item--short">
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
                    <li className="basket-item__list-item"><span className="basket-item__article">Артикул: </span>
                      <span className="basket-item__number">{camera.vendorCode}</span>
                    </li>
                    <li className="basket-item__list-item">
                      {camera.type} {getCameraCategoryInText(camera.category)}
                    </li>
                    <li className="basket-item__list-item">{camera.level} уровень</li>
                  </ul>
                  <p className="basket-item__price">
                    <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)}
                  </p>
                </div>
              </div>
              <div className="modal__buttons">
                <button
                  onClick={handleAddToCartClick}
                  className="btn btn--purple modal__btn modal__btn--fit-width"
                  type="button"
                >
                  <svg width="24" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-add-basket"></use>
                  </svg>
                  Добавить в корзину
                </button>
              </div>
              <button onClick={handleModalClose} className="cross-btn" type="button" aria-label="Закрыть попап">
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg>
              </button>
            </div>}
        </div>
      </div>
    </ReactModal>
  );
}

export default AddToCartModal;
