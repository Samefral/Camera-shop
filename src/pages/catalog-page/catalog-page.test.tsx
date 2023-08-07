import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import HistoryRouter from '../../hocs/history-route/history-route';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils/mocks';
import { NameSpace, OrderStatus } from '../../const';
import CatalogPage from './catalog-page';


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


describe('Page: ProductPage', () => {
  const history = createMemoryHistory();

  it('renders the CatalogPage with promo banner', () => {
    render(
      <Provider store={mockStore({...store})}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CatalogPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(screen.getByText(mockPromoCamera.name)).toBeInTheDocument();

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();

  });


});
