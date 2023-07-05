import { store } from '../store/index.js';
import { Cameras, Camera, PromoCamera } from './camera.js';
import { Reviews } from './review.js';

export type CameraData = {
  cameras: {
    data: Cameras;
    isLoading: boolean;
    currentSortType: string | null;
    currentSortOrder: string | null;
  };
  camera: {
    data: Camera | null;
    isLoading: boolean;
    similarCameras: Cameras;
    isSimilarCamerasLoading: boolean;
  };
  promoCamera: {
    data: PromoCamera | null;
    isLoading: boolean;
  };
};

export type ReviewData = {
  reviews: Reviews;
  isReviewsLoading: boolean;
  isReviewPosting: boolean;
  addReviewModalOpen: boolean;
  addReviewSuccessStatus: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
