import { fireEvent, render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { generatePath, BrowserRouter } from 'react-router-dom';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils/mocks';
import { AppRoute, NameSpace, OrderStatus } from '../../const';
import CameraCard from './camera-card';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

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

describe('CameraCard component', () => {

  it('should render camera card', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter >
          <HelmetProvider>
            <CameraCard camera={mockCamera} isActive={false} />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    const cameraCardImage: HTMLImageElement = screen.getByRole('img');

    expect(cameraCardImage).toBeInTheDocument();
    expect(cameraCardImage.src).toBe(`${window.location.origin}${mockCamera.previewImg}`);
    expect(screen.getByText(mockCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });

  it('should navigate to the product page on click to link', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <HelmetProvider>
            <CameraCard camera={mockCamera} isActive={false} />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    const cameraCardLink = screen.getByText('Подробнее');
    expect(cameraCardLink).toBeInTheDocument();
    fireEvent.click(cameraCardLink);
    expect(window.location.pathname).toBe(generatePath(AppRoute.Product, {id: String(mockCamera.id), tab: AppRoute.ProductDescriptionTab}));
  });


});
