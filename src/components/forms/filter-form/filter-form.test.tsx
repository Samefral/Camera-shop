import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { NameSpace } from '../../../const';
import thunk from 'redux-thunk';
import FilterForm from './filter-form';

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
        <FilterForm />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

describe('FilterForm component', () => {

  it('should render correctly', () => {
    render(
      fakeApp
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();

    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
    expect(screen.getByText('Видеокамера')).toBeInTheDocument();

    expect(screen.getByText('Тип камеры')).toBeInTheDocument();

    expect(screen.getByText('Уровень')).toBeInTheDocument();


  });

  it('renders the reset button', () => {
    render(
      fakeApp
    );
    const resetButton = screen.getByRole('button', { name: /сбросить фильтры/i });
    expect(resetButton).toBeInTheDocument();
  });


});
