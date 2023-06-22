import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { NameSpace } from '../../const';
import { ReviewData } from '../../types/state';

export const initialState: ReviewData = {
  reviews: [],
  isReviewsLoading: false,
  isReviewPosting: false,
  addReviewModalOpen: false,
  addReviewSuccessStatus: false,
};

export const reviewsData = createSlice({
  name: NameSpace.ReviewsData,
  initialState,
  reducers: {
    setAddReviewModalOpen: (state, action: PayloadAction<boolean>) => {
      state.addReviewModalOpen = action.payload;
    },
    setAddReviewSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.addReviewSuccessStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })

      .addCase(postReviewAction.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isReviewPosting = false;
        state.addReviewSuccessStatus = true;
      })
      .addCase(postReviewAction.rejected, (state, action) => {
        state.isReviewPosting = false;
        state.addReviewSuccessStatus = false;
        toast.error(action.error.message);
      });

  }
});

export const { setAddReviewModalOpen, setAddReviewSuccessStatus } = reviewsData.actions;
