import { render, screen } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { NameSpace, AppRoute } from '../../../const';
import Tabs from './tabs';

const mockStore = configureMockStore([thunk]);

const mockCamera = makeFakeCamera();
const mockPromoCamera = makeFakePromoCamera();
const mockCameras = [makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview()];


// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

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


describe('Tabs component', () => {
  const mockParams = { id: String(mockCamera.id), tab: 'description' };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    (useParams as jest.Mock).mockReturnValue(mockParams);
  });


  const fakeApp = (
    <Provider store={mockStore({...store})}>
      <BrowserRouter>
        <HelmetProvider>
          <Tabs />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  );

  it('should render CharacteristicsTab component when activeTab is AppRoute.ProductCharacteristicsTab', () => {
    (useParams as jest.Mock).mockReturnValue({ id: String(mockCamera.id), tab: AppRoute.ProductCharacteristicsTab });
    render(fakeApp);
    const characteristicsTabBtn = screen.getByText('Характеристики');
    expect(characteristicsTabBtn).toBeInTheDocument();
    expect(characteristicsTabBtn).toHaveAttribute('class', 'tabs__control is-active');

    expect(screen.getByText(mockCamera.category)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.level)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.type)).toBeInTheDocument();
  });

  it('should render DescriptionTab component when activeTab is AppRoute.ProductDescriptionTab', () => {
    (useParams as jest.Mock).mockReturnValue({ id: String(mockCamera.id), tab: AppRoute.ProductDescriptionTab });
    render(fakeApp);
    const descriptionTabBtn = screen.getByText('Описание');
    expect(descriptionTabBtn).toBeInTheDocument();
    expect(descriptionTabBtn).toHaveAttribute('class', 'tabs__control is-active');

    expect(screen.getByText(mockCamera.description)).toBeInTheDocument();
  });


});
