import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../../utils/mocks';
import { NameSpace } from '../../../const';
import AddReviewForm from './add-review-form';

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

const fakeApp = (
  <Provider store={mockStore({...store})}>
    <BrowserRouter>
      <HelmetProvider>
        <AddReviewForm />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);


describe('AddReviewForm', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('should update the text field value in the formData state when the user enters the comment', () => {
    render(fakeApp);
    const textareaInput: HTMLTextAreaElement = screen.getByPlaceholderText('Поделитесь своим опытом покупки');
    fireEvent.change(textareaInput, { target: { value: 'Mock comment' } });
    expect(textareaInput.value).toEqual('Mock comment');
  });


});
