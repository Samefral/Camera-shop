import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { generatePath } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../hocs/history-route/history-route';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils/mocks';
import { NameSpace, AppRoute } from '../../const';
import App from './app';


const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

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

const camerasLoadingStore = mockStore({
  ...store,
  [NameSpace.CamerasData]: {
    cameras: {
      data: mockCameras,
      isLoading: true,
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
  }
});

const fakeApp = (
  <Provider store={mockStore({...store})}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);

const loadingApp = (
  <Provider store={camerasLoadingStore}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should display LoadingScreen when cameras data is loading', () => {
    history.push(AppRoute.Root);

    render(loadingApp);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();

  });

  it('should render "CatalogPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();

    expect(screen.getByText(mockPromoCamera.name)).toBeInTheDocument();

  });

  it('should render "ProductPage" when user navigate to "/product/:id/:tab', () => {
    history.push(generatePath(AppRoute.Product, {id: String(mockCamera.id), tab: AppRoute.ProductDescriptionTab}));

    render(fakeApp);

    screen.getAllByText(mockCamera.name).forEach((textElement) => {
      expect(textElement).toBeInTheDocument();
    });

    expect(screen.getByText(mockCamera.description)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.reviewCount)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

});
