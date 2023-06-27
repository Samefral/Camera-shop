import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { NameSpace, AppRoute } from '../../../const';
import Breadcrumbs from './breadcrumbs';

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


describe('BreadCrumbs component', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <HelmetProvider>
            <Breadcrumbs />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });

  it('should navigate to the home page on click to link', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <HelmetProvider>
            <Breadcrumbs />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    const homeLink = screen.getByText('Главная');
    expect(homeLink).toBeInTheDocument();

    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe(AppRoute.Root);
  });

});
