import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { NameSpace, OrderStatus } from '../../../const';
import CartOrder from './cart-order';


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
    totalPrice: mockCamera.price,
    totalCount: mockCamera.count,
    discount: 15,
    discountCoupon: 'camera-333',
    discountCouponError: false,
    discountCopounSuccess: true,
    cameraInCartModal: null,
    successModalOpen: false,
    orderStatus: OrderStatus.Null,
  }
};

const fakeApp = (
  <Provider store={mockStore({...store})}>
    <BrowserRouter>
      <HelmetProvider>
        <CartOrder />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

describe('CartOrder component', () => {

  it('should render cart order correctly', () => {
    render(fakeApp);

    expect(screen.getByText('Всего:')).toBeInTheDocument();
    expect(screen.getByText('Скидка:')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();

  });

});
