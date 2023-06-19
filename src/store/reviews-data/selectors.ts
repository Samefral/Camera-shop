import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Reviews } from '../../types/review';

export const getReviews = (state: State): Reviews => state[NameSpace.ReviewsData].reviews;
export const getReviewsDataLoadingStatus = (state: State): boolean => state[NameSpace.ReviewsData].isReviewsLoading;
export const getRivewPostingStatus = (state: State): boolean => state[NameSpace.ReviewsData].isReviewPosting;

export const getAddRevieModalOpenStatus = (state: State): boolean => state[NameSpace.ReviewsData].addReviewModalOpenStatus;
