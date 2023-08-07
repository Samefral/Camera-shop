import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils/mocks';
import { NameSpace, OrderStatus } from '../../const';
import { AppRoute } from '../../const';
import thunk from 'redux-thunk';
import Header from './header';

const mockStore = configureMockStore([thunk]);

const mockCamera = makeFakeCamera();
const mockPromoCamera = makeFakePromoCamera();
const mockCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];

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
  [NameSpace.CartData]: {
    cameras: [],
    totalPrice: 0,
    totalCount: 0,
    discount: 0,
    discountCoupon: null,
    discountCouponError: false,
    discountCopounSuccess: false,
    cameraInCartModal: null,
    successModalOpen: false,
    orderStatus: OrderStatus.Null,
  }
};

const fakeApp = (
  <Provider store={mockStore({...store})}>
    <BrowserRouter>
      <HelmetProvider>
        <Header />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

describe('Header component', () => {
  it('should render correctly', () => {
    render(
      fakeApp
    );

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveAttribute('class', 'header');

    const homeLink = screen.getByText('Каталог');

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', AppRoute.Root);

    const basketLink = screen.getByTestId('basket-link');

    expect(basketLink).toBeInTheDocument();
    expect(basketLink).toHaveAttribute('href', AppRoute.Cart);
  });
});
