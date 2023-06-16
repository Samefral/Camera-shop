import { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { getReviews, getReviewsDataLoadingStatus } from '../../../store/reviews-data/selectors';
import { Reviews } from '../../../types/review';
import LoadingScreen from '../../../pages/loading-screen/loading-screen';
import ReviewCard from './review-card/review-card';

const DEFAULT_RENDERED_REVIEWS_QUANTITY = 3;
const REVIEWS_TO_RENDER_QUANTITY = 3;

const sortReviewsByDate = (reviews: Reviews) => [...reviews].sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt));

function ProductReviews(): JSX.Element {
  const [renderedReviews, setRenderedReviews] = useState(DEFAULT_RENDERED_REVIEWS_QUANTITY);
  const reviews = sortReviewsByDate(useAppSelector(getReviews));
  const isReviewsLoading = useAppSelector(getReviewsDataLoadingStatus);

  if (isReviewsLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {reviews.slice(0, renderedReviews).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </ul>
          <div className="review-block__buttons">
            {
              renderedReviews >= reviews.length ? null :
                <button
                  onClick={() => setRenderedReviews(renderedReviews + REVIEWS_TO_RENDER_QUANTITY)}
                  className="btn btn--purple"
                  type="button"
                >
                  Показать больше отзывов
                </button>
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductReviews;
