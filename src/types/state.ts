import { store } from '../store/index.js';
import { Cameras, Camera, PromoCamera } from './camera.js';

export type CameraData = {
  cameras: {
    data: Cameras;
    isLoading: boolean;
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

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
