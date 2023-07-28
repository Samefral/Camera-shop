import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { NameSpace } from '../../../const';
import AddReviewModal from './add-review-modal';

const mockStore = configureMockStore([thunk]);

const mockCamera = makeFakeCamera();
const mockPromoCamera = makeFakePromoCamera();
const mockCameras = [makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview()];


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
    addReviewModalOpen: true,
    addReviewSuccessStatus: false,
  },
};

const addReviewSuccessState = mockStore({
  ...store,
  [NameSpace.ReviewsData]: {
    reviews: mockReviews,
    isReviewsLoading: false,
    isReviewPosting: false,
    addReviewModalOpen: true,
    addReviewSuccessStatus: true,
  }
});

describe('AddReviewModal component', () => {
  it('should render ReactModal with the correct props', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <HelmetProvider>
            <AddReviewModal />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    const reactModal = screen.getByRole('dialog', {hidden: true});

    expect(reactModal).toBeInTheDocument();
    expect(reactModal).toHaveAttribute('aria-modal', 'true');
    expect(reactModal).toHaveStyle({position: 'absolute', inset: 'unset'});
    expect(reactModal).toHaveClass('ReactModal__Content');

    const crossBtn = screen.getByLabelText('Закрыть попап');
    expect(crossBtn).toBeInTheDocument();
  });

  it('should render modal__content with AddReviewForm when isAddReviewSuccess is false', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <HelmetProvider>
            <AddReviewModal />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Ваше имя')).toBeInTheDocument();
  });

  it('should render modal__content with success message when isAddReviewSuccess is true', () => {
    render(
      <Provider store={addReviewSuccessState}>
        <BrowserRouter>
          <HelmetProvider>
            <AddReviewModal />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });


});
