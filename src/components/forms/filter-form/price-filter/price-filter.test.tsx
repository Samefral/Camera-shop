import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../../utils/mocks';
import { NameSpace, OrderStatus } from '../../../../const';
import thunk from 'redux-thunk';
import PriceFilter from './price-filter';

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
        <PriceFilter />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

describe('PriceFilter component', () => {

  const prices = mockCameras.map((camera) => camera.price);
  const maxPossiblePrice = Math.max(...prices);
  const minPossiblePrice = Math.min(...prices);

  test('renders the PriceFilter component', () => {
    render(fakeApp);
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`${minPossiblePrice}`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`${maxPossiblePrice}`)).toBeInTheDocument();
  });

  test('updates minPriceInput when min price is entered', () => {
    render(fakeApp);
    const minPriceInput: HTMLInputElement = screen.getByPlaceholderText(`${minPossiblePrice}`);
    fireEvent.input(minPriceInput, { target: { value: '1000' } });
    expect(minPriceInput.value).toBe('1000');
  });

  test('updates maxPriceInput when max price is entered', () => {
    render(fakeApp);
    const maxPriceInput: HTMLInputElement = screen.getByPlaceholderText(`${maxPossiblePrice}`);
    fireEvent.input(maxPriceInput, { target: { value: '5000' } });
    expect(maxPriceInput.value).toBe('5000');
  });

});
