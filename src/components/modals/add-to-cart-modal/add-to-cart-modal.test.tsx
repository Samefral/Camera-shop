import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { NameSpace, OrderStatus } from '../../../const';
import AddToCartModal from './add-to-cart-modal';

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
    cameraInCartModal: mockCamera,
    successModalOpen: false,
    orderStatus: OrderStatus.Null,
  }
};

const addToCartSuccessState = mockStore({
  ...store,
  [NameSpace.CartData]: {
    ...store.CART_DATA,
    successModalOpen: true,
  }
});

describe('AddToCartModal component', () => {
  it('should render ReactModal with the correct props', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <HelmetProvider>
            <AddToCartModal />
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

  it('should render modal__content with cart camera data when successModalOpen is false', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <HelmetProvider>
            <AddToCartModal />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
  });

  it('should render modal__content with success message when successModalOpen is true', () => {
    render(
      <Provider store={addToCartSuccessState}>
        <BrowserRouter>
          <HelmetProvider>
            <AddToCartModal />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
  });


});
