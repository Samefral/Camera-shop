import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import thunk from 'redux-thunk';
import { NameSpace, CAMERAS_PER_PAGE} from '../../const';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils/mocks';
import Pagination from './pagination';

const mockStore = configureMockStore([thunk]);

const mockCamera = makeFakeCamera();
const mockPromoCamera = makeFakePromoCamera();
const mockCameras = [
  makeFakeCamera(), makeFakeCamera(), makeFakeCamera(),
  makeFakeCamera(), makeFakeCamera(), makeFakeCamera(),
  makeFakeCamera(), makeFakeCamera(), makeFakeCamera(),
  makeFakeCamera(), makeFakeCamera()
];
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

const getFakeApp = (page: number) => (
  <Provider store={mockStore({...store})}>
    <BrowserRouter>
      <HelmetProvider>
        <Pagination currentPage={page} currentSortType={''} currentSortOrder={''} cameras={mockCameras}/>
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);


describe('Pagination component', () => {
  const pagesCount = Math.ceil(mockCameras.length / CAMERAS_PER_PAGE);

  it('should show pagination links', () => {
    render(getFakeApp(1));
    const links = screen.getAllByTestId('pagination-link');
    expect(links).toHaveLength(pagesCount);
  });

  it('should remove "previous" link on the first page', () => {
    render(getFakeApp(1));
    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
  });

  it('should remove "next" link on the last page', () => {
    render(getFakeApp(pagesCount));
    expect(screen.queryByText('Далее')).not.toBeInTheDocument();
  });

});
