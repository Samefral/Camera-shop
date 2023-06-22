import { useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getCamera } from '../../../store/cameras-data/selectors';
import { postReviewAction } from '../../../store/api-actions';
import { PostReviewData } from '../../../types/review';

function AddReviewForm(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<PostReviewData>();
  const cameraId = useAppSelector(getCamera).id;
  const inputErrorClass = 'is-invalid custom-input form-review__item';
  const inputNoErrorClass = 'custom-input form-review__item';
  const textAreaErrorClass = 'is-invalid custom-textarea form-review__item';
  const textAreaNoErrorClass = 'custom-textarea form-review__item';

  const dispatch = useAppDispatch();

  const onSubmit = (data: PostReviewData) => {
    dispatch(postReviewAction({
      cameraId: cameraId,
      userName: data.userName,
      advantage: data.advantage,
      disadvantage: data.disadvantage,
      review: data.review,
      rating: Number(data.rating)
    }));
  };

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        void handleSubmit(onSubmit)(evt);
      }}
      method="post"
    >
      <div className="form-review__rate">
        <fieldset className="rate form-review__item">
          <legend className="rate__caption">Рейтинг
            <svg width="9" height="9" aria-hidden="true">
              <use xlinkHref="#icon-snowflake"></use>
            </svg>
          </legend>
          <div className="rate__bar">
            <div className="rate__group">
              <input
                {...register('rating', {required: true})}
                className="visually-hidden" id="star-5" name="rating" type="radio" value="5"
              />
              <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
              <input
                {...register('rating', {required: true})}
                className="visually-hidden" id="star-4" name="rating" type="radio" value="4"
              />
              <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
              <input
                {...register('rating', {required: true})}
                className="visually-hidden" id="star-3" name="rating" type="radio" value="3"
              />
              <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
              <input
                {...register('rating', {required: true})}
                className="visually-hidden" id="star-2" name="rating" type="radio" value="2"
              />
              <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
              <input
                {...register('rating', {required: true})}
                className="visually-hidden" id="star-1" name="rating" type="radio" value="1"
              />
              <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
            </div>
            <div className="rate__progress">
              <span className="rate__stars">0</span>
              <span>/</span>
              <span className="rate__all-stars">5</span>
            </div>
          </div>
          <p style={{opacity: errors.rating ? 1 : 0}} className="rate__message">Нужно оценить товар</p>
        </fieldset>
        <div className={errors.userName ? inputErrorClass : inputNoErrorClass} >
          <label>
            <span className="custom-input__label">Ваше имя
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input
              {...register('userName', {required: true})}
              aria-invalid={errors.userName ? 'true' : 'false'}
              type="text" name="userName" placeholder="Введите ваше имя"
            />
          </label>
          <p style={{opacity: errors.userName ? 1 : 0}} className="custom-input__error">Нужно указать имя</p>
        </div>
        <div className={errors.advantage ? inputErrorClass : inputNoErrorClass} >
          <label>
            <span className="custom-input__label">Достоинства
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input
              {...register('advantage', {required: true})}
              aria-invalid={errors.advantage ? 'true' : 'false'}
              type="text" name="advantage" placeholder="Основные преимущества товара"
            />
          </label>
          <p style={{opacity: errors.advantage ? 1 : 0}} className="custom-input__error">Нужно указать достоинства</p>
        </div>
        <div className={errors.disadvantage ? inputErrorClass : inputNoErrorClass} >
          <label>
            <span className="custom-input__label">Недостатки
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input
              {...register('disadvantage', {required: true})}
              aria-invalid={errors.disadvantage ? 'true' : 'false'}
              type="text" name="disadvantage" placeholder="Главные недостатки товара"
            />
          </label>
          <p style={{opacity: errors.disadvantage ? 1 : 0}} className="custom-input__error">Нужно указать недостатки</p>
        </div>
        <div className={errors.review ? textAreaErrorClass : textAreaNoErrorClass} >
          <label>
            <span className="custom-textarea__label">Комментарий
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <textarea
              {...register('review', {required: true})}
              aria-invalid={errors.review ? 'true' : 'false'}
              name="review" minLength={5} placeholder="Поделитесь своим опытом покупки"
            >
            </textarea>
          </label>
          <div style={{opacity: errors.review ? 1 : 0}} className="custom-textarea__error">Нужно добавить комментарий</div>
        </div>
      </div>
      <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
    </form>
  );
}

export default AddReviewForm;
