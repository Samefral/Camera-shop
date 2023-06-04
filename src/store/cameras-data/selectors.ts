import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Cameras, Camera, PromoCamera } from '../../types/camera';


export const getCameras = (state: State): Cameras => state[NameSpace.CamerasData].cameras.data;
export const getCamerasDataLoadingStatus = (state: State): boolean => state[NameSpace.CamerasData].cameras.isLoading;

export const getCamera = (state: State) => state[NameSpace.CamerasData].camera.data as Camera;
export const getCameraDataLoadingStatus = (state: State): boolean => state[NameSpace.CamerasData].camera.isLoading;

export const getSimilarCameras = (state: State): Cameras => state[NameSpace.CamerasData].camera.similarCameras;
export const getSimilarCamerasDataLoadingStatus = (state: State): boolean => state[NameSpace.CamerasData].camera.isSimilarCamerasLoading;

export const getPromoCamera = (state: State) => state[NameSpace.CamerasData].promoCamera.data as PromoCamera;
export const getPromoCameraDataLoadingStatus = (state: State): boolean => state[NameSpace.CamerasData].promoCamera.isLoading;
