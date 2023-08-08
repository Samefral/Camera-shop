import { Provider } from 'react-redux';
import { screen, render } from '@testing-library/react';
import thunk from 'redux-thunk';
import EmptyCartPage from './empty-cart-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, OrderStatus } from '../../../const';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../../hocs/history-route/history-route';
import { createMemoryHistory } from 'history';

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

describe('Page: EmptyCartPage', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore({...store})}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <EmptyCartPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });
});
