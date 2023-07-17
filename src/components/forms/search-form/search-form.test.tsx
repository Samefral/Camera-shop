import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { NameSpace } from '../../../const';
import thunk from 'redux-thunk';
import SearchForm from './search-form';

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
};

const fakeApp = (
  <Provider store={mockStore({...store})}>
    <BrowserRouter>
      <HelmetProvider>
        <SearchForm isCamerasLoading={false} />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

const fakeLoadingApp = (
  <Provider store={mockStore({
    ...store,
    [NameSpace.CamerasData]: {
      cameras: {
        data: mockCameras,
        isLoading: true,
      }
    }
  })}
  >
    <BrowserRouter>
      <HelmetProvider>
        <SearchForm isCamerasLoading />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);
describe('SearchForm component', () => {
  test('renders search form component', () => {
    render(
      fakeApp
    );
    const searchInput = screen.getByPlaceholderText('Поиск по сайту');
    expect(searchInput).toBeInTheDocument();
  });

  test('disabled searchInput & displays "Камеры загружаются..." placeholder when cameras are loading', () => {
    render(
      fakeLoadingApp
    );
    const searchInput = screen.getByPlaceholderText('Камеры загружаются...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toBeDisabled();
  });

  test('displays search results when input value changes', () => {
    render(
      fakeApp
    );
    const searchInput = screen.getByPlaceholderText('Поиск по сайту');

    fireEvent.change(searchInput, { target: { value: mockCameras[3].name[0] } });

    expect(screen.getByText(mockCameras[3].name)).toBeInTheDocument();
  });

  test('hides search results dropdown when there are no search results', () => {
    render(
      fakeApp
    );
    const searchInput = screen.getByPlaceholderText('Поиск по сайту');

    fireEvent.change(searchInput, { target: { value: '' } });

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

});


