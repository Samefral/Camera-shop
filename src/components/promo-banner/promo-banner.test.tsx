import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { generatePath } from 'react-router-dom';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils/mocks';
import { NameSpace, AppRoute } from '../../const';
import PromoBanner from './promo-banner';

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

const promoCameraLoadingState = mockStore({
  ...store,
  [NameSpace.CamerasData]: {
    promoCamera: {
      data: mockPromoCamera,
      isLoading: true,
    }
  }
});

describe('PromoBanner component', () => {
  it('should render correct promo film info', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <HelmetProvider>
            <PromoBanner />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(screen.getByText(mockPromoCamera.name)).toBeInTheDocument();


    const promoCameraImage: HTMLImageElement = screen.getByRole('img');

    expect(promoCameraImage).toBeInTheDocument();
    expect(promoCameraImage.src).toBe(`${window.location.origin}${mockPromoCamera.previewImg}`);
  });

  it('should navigate to the product page on click to link', () => {
    render(
      <Provider store={mockStore({...store})}>
        <BrowserRouter>
          <HelmetProvider>
            <PromoBanner />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    const promoCameraLink = screen.getByRole('link');
    expect(promoCameraLink).toBeInTheDocument();
    fireEvent.click(promoCameraLink);
    expect(window.location.pathname).toBe(generatePath(AppRoute.Product,
      {id: String(mockPromoCamera.id), tab: AppRoute.ProductDescriptionTab}));
  });

  it('should render loading screen if promo film data is loading', () => {
    render(
      <Provider store={promoCameraLoadingState}>
        <BrowserRouter>
          <HelmetProvider>
            <PromoBanner />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });


});
