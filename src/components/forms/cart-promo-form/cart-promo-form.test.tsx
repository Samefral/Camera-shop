import { fireEvent, render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { NameSpace, OrderStatus } from '../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import CartPromoForm from './cart-promo-form';

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

describe('CartPromoForm component', () => {

  it('should render cart promo form correctly', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter >
          <HelmetProvider>
            <CartPromoForm />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();
    expect(screen.getByText('Промокод')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
  });

  it('should update the input field value in the promo input when the user enters the comment', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter >
          <HelmetProvider>
            <CartPromoForm />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    const promoInput: HTMLInputElement = screen.getByPlaceholderText('Введите промокод');
    fireEvent.change(promoInput, { target: { value: 'camera22' } });
    expect(promoInput.value).toEqual('camera22');
  });


});
