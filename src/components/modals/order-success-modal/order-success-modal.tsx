import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getCartOrderStatus } from '../../../store/cart-data/selectors';
import { setOrderStatus } from '../../../store/cart-data/cart-data';
import { AppRoute, OrderStatus } from '../../../const';
import ReactModal from 'react-modal';

function OrderSuccessModal(): JSX.Element {
  const orderStatus = useAppSelector(getCartOrderStatus);
  const isOrderSuccess = orderStatus === OrderStatus.Fulfilled;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    dispatch(setOrderStatus(OrderStatus.Null));
  };

  return (
    <ReactModal
      isOpen={isOrderSuccess}
      ariaHideApp={false}
      style={{content: {inset: 'unset'}}}
      bodyOpenClassName='scroll-lock'
      overlayClassName='custom-modal-overlay'
      onRequestClose={handleModalClose}
    >
      <div className='modal is-active'>
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            onClick={handleModalClose}
          >
          </div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={() => navigate(AppRoute.Catalog)}
              >
                Вернуться к покупкам
              </button>
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

export default OrderSuccessModal;
