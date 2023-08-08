import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import HistoryRouter from '../../hocs/history-route/history-route';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils/mocks';
import { NameSpace, OrderStatus } from '../../const';
import CartPage from './cart-page';

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
    cameras: [mockCamera],
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

const emptyCartState = mockStore({
  ...store,
  [NameSpace.CartData]: {
    ...store.CART_DATA,
    cameras: []
  }
});

const errorCartState = mockStore({
  ...store,
  [NameSpace.CartData]: {
    ...store.CART_DATA,
    orderStatus: OrderStatus.Rejected
  }
});


describe('Page: CartPage', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore({...store})}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CartPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.type)).toBeInTheDocument();
  });

  it('should render empty cart page with empty cart cameras', () => {

    render(
      <Provider store={emptyCartState}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CartPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });

  it('should render error cart page with error order status', () => {

    render(
      <Provider store={errorCartState}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CartPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Ошибка при оформлении заказа')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });

});
