import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { NameSpace } from '../../../const';
import thunk from 'redux-thunk';
import SortForm from './sort-form';

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
        <SortForm />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

describe('SortForm component', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();

  });

  it('should navigate correctly', () => {
    render(fakeApp);

    const ascendingRadiobutton: HTMLInputElement = screen.getByLabelText('По возрастанию');
    const descendingRadiobutton: HTMLInputElement = screen.getByLabelText('По убыванию');

    expect(ascendingRadiobutton.checked).toBe(false);
    expect(descendingRadiobutton.checked).toBe(false);

    fireEvent.click(descendingRadiobutton);

    expect(window.location.pathname).toBe('/catalog/1/price/down');
  });


});
