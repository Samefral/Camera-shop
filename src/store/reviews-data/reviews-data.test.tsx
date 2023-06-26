import { toast } from 'react-toastify';
import { reviewsData, setAddReviewModalOpen, setAddReviewSuccessStatus } from './reviews-data';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { makeFakeReview } from '../../utils/mocks';

const mockReviews = [makeFakeReview(), makeFakeReview()];

jest.mock('react-toastify');

describe('Reducer: setAddReviewModalOpen', () => {
  it('should set addReviewModalOpen by a given boolean value', () => {
    const state = {
      reviews: [],
      isReviewsLoading: false,
      isReviewPosting: false,
      addReviewModalOpen: false,
      addReviewSuccessStatus: false,
    };

    expect(reviewsData.reducer(state, setAddReviewModalOpen(true)))
      .toEqual({
        ...state,
        addReviewModalOpen: true,
      });
  });

});

describe('Reducer: setAddReviewSuccessStatus', () => {
  it('should set addReviewSuccessStatus by a given boolean value', () => {
    const state = {
      reviews: [],
      isReviewsLoading: false,
      isReviewPosting: false,
      addReviewModalOpen: false,
      addReviewSuccessStatus: false,
    };

    expect(reviewsData.reducer(state, setAddReviewSuccessStatus(true)))
      .toEqual({
        ...state,
        addReviewSuccessStatus: true,
      });
  });

});

describe('extraReducers: reviewsData', () => {
  const state = {
    reviews: [],
    isReviewsLoading: false,
    isReviewPosting: false,
    addReviewModalOpen: false,
    addReviewSuccessStatus: false,
  };

  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchReviewsAction', () => {
    it('should set isReviewsLoading to true on fetchReviewsAction.pending', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({
          ...state,
          isReviewsLoading: true
        });
    });

    it('should update reviews by load reviews + set isReviewsLoading to false', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: mockReviews}))
        .toEqual({
          ...state,
          reviews: mockReviews,
          isReviewsLoading: false
        });
    });


  });

  describe('postReviewAction', () => {
    it('should set isReviewPosting to true when postReviewAction.pending is called', () => {
      expect(reviewsData.reducer(state, {type: postReviewAction.pending.type}))
        .toEqual({
          ...state,
          isReviewPosting: true
        });
    });

    it('should set isReviewPosting to false & addReviewSuccessStatus to true when postReviewAction.fulfilled is called', () => {
      expect(reviewsData.reducer(state, {type: postReviewAction.fulfilled.type}))
        .toEqual({
          ...state,
          isReviewPosting: false,
          addReviewSuccessStatus: true
        });
    });

    it('should set isReviewPosting to false & addReviewSuccessStatus to false & show error when postReviewAction.rejected is called', () => {
      const errorMsg = 'An error occurred';
      const action = {
        type: postReviewAction.rejected.type,
        payload: { arg: null, requestStatus: 'rejected', requestId: '', aborted: false, condition: true },
        error: { message: errorMsg },
      };
      expect(reviewsData.reducer(state, action))
        .toEqual({
          ...state,
          isReviewPosting: false,
          addReviewSuccessStatus: false
        });
      expect(toast.error).toHaveBeenCalledWith(errorMsg);
    });


  });

});
