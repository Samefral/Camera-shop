import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getCameraInCartModal } from '../../../store/cart-data/selectors';
import { setCameraInCartModal, removeCameraFromCart } from '../../../store/cart-data/cart-data';
import { getCameraCategoryInText } from '../../../utils/utils';
import ReactModal from 'react-modal';

function RemoveFromCartModal(): JSX.Element {
  const camera = useAppSelector(getCameraInCartModal);

  const dispatch = useAppDispatch();

  const onModalClose = () => {
    dispatch(setCameraInCartModal(null));
  };

  const handleModalClose = () => onModalClose();

  const handleRemoveFromCartClick = () => {
    dispatch(removeCameraFromCart(camera));
    onModalClose();
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
      <div className='modal is-active'>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleModalClose}></div>
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
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
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">Артикул:</span>
                    <span className="basket-item__number">{camera.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{camera.type} {getCameraCategoryInText(camera.category)}</li>
                  <li className="basket-item__list-item">{camera.level} уровень</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
                onClick={handleRemoveFromCartClick}
              >
                Удалить
              </button>
              <Link
                className="btn btn--transparent modal__btn modal__btn--half-width"
                to='#'
                onClick={handleModalClose}
              >
                Продолжить покупки
              </Link>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={handleModalClose}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default RemoveFromCartModal;
