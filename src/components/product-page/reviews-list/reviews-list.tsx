import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getReviews } from '../../../store/reviews-data/selectors';
import { sortReviewsByDate } from '../../../utils/utils';
import { Reviews } from '../../../types/review';
import { setAddReviewModalOpen } from '../../../store/reviews-data/reviews-data';
import ReviewCard from './review-card/review-card';

const DEFAULT_RENDERED_REVIEWS_COUNT = 3;
const REVIEWS_TO_RENDER_COUNT = 3;

const checkIfReachedEndOfPage = () => window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight;
const areAllReviewsDisplayed = (renderedReviewsCount: number, reviews: Reviews) => renderedReviewsCount >= reviews.length;

function ReviewsList(): JSX.Element {
  const [renderedReviewsCount, setRenderedReviewsCount] = useState(DEFAULT_RENDERED_REVIEWS_COUNT);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const reviews = sortReviewsByDate(useAppSelector(getReviews));

  const dispatch = useAppDispatch();

  const handleScroll = () => {
    if (checkIfReachedEndOfPage()) {
      setHasScrolledToBottom(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    if (areAllReviewsDisplayed(renderedReviewsCount, reviews)) {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [renderedReviewsCount, reviews]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && hasScrolledToBottom && !areAllReviewsDisplayed(renderedReviewsCount, reviews)) {
      setRenderedReviewsCount(renderedReviewsCount + REVIEWS_TO_RENDER_COUNT);
      setHasScrolledToBottom(false);
    }

    return () => {
      isMounted = false;
    };

  }, [hasScrolledToBottom, renderedReviewsCount, reviews]);

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={() => dispatch(setAddReviewModalOpen(true))}>Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {reviews.slice(0, renderedReviewsCount).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </ul>
          <div className="review-block__buttons">
            {
              areAllReviewsDisplayed(renderedReviewsCount, reviews) ? null :
                <button
                  onClick={() => setRenderedReviewsCount(renderedReviewsCount + REVIEWS_TO_RENDER_COUNT)}
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

export default ReviewsList;
