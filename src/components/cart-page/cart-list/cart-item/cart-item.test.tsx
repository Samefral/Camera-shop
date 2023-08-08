import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../../utils/mocks';
import { NameSpace, OrderStatus } from '../../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import CartItem from './cart-item';

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

describe('CartItem component', () => {

  it('should render cart item', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter >
          <HelmetProvider>
            <CartItem camera={mockCamera} />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    const cameraCardImage: HTMLImageElement = screen.getByRole('img');

    expect(cameraCardImage).toBeInTheDocument();
    expect(cameraCardImage.src).toBe(`${window.location.origin}${mockCamera.previewImg}`);
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.type)).toBeInTheDocument();
    expect(screen.getByText('Общая цена:')).toBeInTheDocument();
  });

  it('should render count buttons', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter >
          <HelmetProvider>
            <CartItem camera={mockCamera} />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    const counter = screen.getByLabelText('количество товара');
    const decrBtn = screen.getByLabelText('уменьшить количество товара');
    const incrBtn = screen.getByLabelText('увеличить количество товара');

    expect(counter).toBeInTheDocument();
    expect(decrBtn).toBeInTheDocument();
    expect(incrBtn).toBeInTheDocument();

    expect(decrBtn).toBeDisabled();

  });


});
