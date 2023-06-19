import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { getAddRevieModalOpenStatus } from '../../../../store/reviews-data/selectors';
import { setAddReviewModalOpenStatus } from '../../../../store/reviews-data/reviews-data';
import ReactFocusLock from 'react-focus-lock';
import AddReviewForm from '../../../forms/add-review-form/add-review-form';

interface KeyboardEvent {
  key: string;
}

function AddReviewModal(): JSX.Element {
  const isOpen = useAppSelector(getAddRevieModalOpenStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const onEscapeKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        dispatch(setAddReviewModalOpenStatus(false));
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onEscapeKeydown);
    }
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', onEscapeKeydown);
    };
  }, [dispatch, isOpen]);

  return (
    <ReactFocusLock >
      <div className={isOpen ? 'modal is-active' : 'modal'} >
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            onClick={() => dispatch(setAddReviewModalOpenStatus(false))}
          >
          </div>
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <AddReviewForm />
            </div>
            <button
              onClick={() => dispatch(setAddReviewModalOpenStatus(false))}
              className="cross-btn"
              type="button" aria-label="Закрыть попап"
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default AddReviewModal;
