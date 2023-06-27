import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../../utils/mocks';
import { NameSpace } from '../../../../const';
import { sortReviewsByDate } from '../../../../utils/utils';
import ReviewsList from './reviews-list';

const mockStore = configureMockStore([thunk]);

const mockCamera = makeFakeCamera();
const mockPromoCamera = makeFakePromoCamera();
const mockCameras = [makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];

const store = {
  [NameSpace.CamerasData]: {
    cameras: {
      data: mockCameras,
      isLoading: false,
    },
    camera: {
      data: mockCamera,
      isLoading: false,
      similarCameras: mockCameras,
      isSimilarCamerasLoading: false,
    },
    promoCamera: {
      data: mockPromoCamera,
      isLoading: false,
    }
  },
  [NameSpace.ReviewsData]: {
    reviews: mockReviews,
    isReviewsLoading: false,
    isReviewPosting: false,
    addReviewModalOpen: false,
    addReviewSuccessStatus: false,
  },
};

const fakeApp = (
  <Provider store={mockStore({...store})}>
    <BrowserRouter>
      <HelmetProvider>
        <ReviewsList />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

describe('ReviewsList component', () => {
  const DEFAULT_RENDERED_REVIEWS_COUNT = 3;
  const sortedReviews = sortReviewsByDate(mockReviews);

  it('should render ShowMoreBtn when renderedFilmsQuantity is less than filteredFilms length', () => {
    render(fakeApp);

    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
  });

  test('Add review button should be present on the page', () => {
    render(fakeApp);
    const button = screen.getByRole('button', { name: /Оставить свой отзыв/i });
    expect(button).toBeInTheDocument();
  });

  test('Initial reviews should be displayed', () => {
    render(fakeApp);
    sortedReviews.slice(0, DEFAULT_RENDERED_REVIEWS_COUNT).forEach((review) => {
      const reviewText = screen.getByText(review.review);
      expect(reviewText).toBeInTheDocument();
    });
  });

});
