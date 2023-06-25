import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import HistoryRouter from '../../hocs/history-route/history-route';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils/mocks';
import { NameSpace } from '../../const';
import ProductPage from './product-page';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

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
};

const cameraLoadingState = mockStore({
  ...store,
  [NameSpace.CamerasData]: {
    camera: {
      data: mockCamera,
      isLoading: true,
      similarCameras: mockCameras,
      isSimilarCamerasLoading: false,
    },
    promoCamera: {
      data: mockPromoCamera,
      isLoading: false,
    }
  }
});


describe('Page: ProductPage', () => {
  const mockParams = { tab: 'description' };
  const history = createMemoryHistory();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    (useParams as jest.Mock).mockReturnValue(mockParams);
  });

  it('renders LoadingScreen when camera data is loading', () => {

    render(
      <Provider store={cameraLoadingState}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  it('renders the ProductPage with camera data', () => {
    render(
      <Provider store={mockStore({...store})}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    screen.getAllByText(mockCamera.name).forEach((textElement) => {
      expect(textElement).toBeInTheDocument();
    });

    expect(screen.getByText(mockCamera.description)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.reviewCount)).toBeInTheDocument();
  });


});
