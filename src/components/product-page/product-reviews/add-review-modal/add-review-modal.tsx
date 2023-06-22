import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { getAddRevieModalOpenStatus, getAddReviewSuccessStatus } from '../../../../store/reviews-data/selectors';
import { setAddReviewModalOpen, setAddReviewSuccessStatus } from '../../../../store/reviews-data/reviews-data';
import ReactModal from 'react-modal';
import AddReviewForm from '../../../forms/add-review-form/add-review-form';

function AddReviewModal(): JSX.Element {
  const isModalOpen = useAppSelector(getAddRevieModalOpenStatus);
  const isAddReviewSuccess = useAppSelector(getAddReviewSuccessStatus);

  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    dispatch(setAddReviewModalOpen(false));
    dispatch(setAddReviewSuccessStatus(false));
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
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
          {
            isAddReviewSuccess ?
              <div className="modal__content">
                <p className="title title--h4">Спасибо за отзыв</p>
                <svg className="modal__icon" width="80" height="78" aria-hidden="true">
                  <use xlinkHref="#icon-review-success"></use>
                </svg>
                <div className="modal__buttons">
                  <button
                    onClick={handleModalClose}
                    className="btn btn--purple modal__btn modal__btn--fit-width"
                    type="button"
                    autoFocus
                  >
                    Вернуться к покупкам
                  </button>
                </div>
                <button
                  onClick={handleModalClose}
                  className="cross-btn"
                  type="button"
                  aria-label="Закрыть попап"
                >
                  <svg width="10" height="10" aria-hidden="true">
                    <use xlinkHref="#icon-close"></use>
                  </svg>
                </button>
              </div>
              :
              <div className="modal__content">
                <p className="title title--h4">Оставить отзыв</p>
                <div className="form-review">
                  <AddReviewForm />
                </div>
                <button
                  onClick={handleModalClose}
                  className="cross-btn"
                  type="button" aria-label="Закрыть попап"
                >
                  <svg width="10" height="10" aria-hidden="true">
                    <use xlinkHref="#icon-close"></use>
                  </svg>
                </button>
              </div>
          }
        </div>
      </div>
    </ReactModal>
  );
}

export default AddReviewModal;
