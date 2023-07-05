import { createSelector } from 'reselect';
import { AppRoute, NameSpace } from '../../const';
import { State } from '../../types/state';
import { Cameras, Camera, PromoCamera } from '../../types/camera';


export const getCameras = (state: State): Cameras => state[NameSpace.CamerasData].cameras.data;
export const getCamerasDataLoadingStatus = (state: State): boolean => state[NameSpace.CamerasData].cameras.isLoading;
export const getCurrentSortType = (state: State) => state[NameSpace.CamerasData].cameras.currentSortType;
export const getCurrentSortOrder = (state: State) => state[NameSpace.CamerasData].cameras.currentSortOrder;

export const getSortedCameras = createSelector(
  [getCameras, getCurrentSortType, getCurrentSortOrder],
  (cameras, sortType, sortOrder) => {
    if (!sortType) {
      return cameras;
    }
    const sortedCameras = [...cameras];
    switch (sortType) {
      case AppRoute.CatalogSortPriceType:
        sortedCameras.sort((a, b) => b.price - a.price);
        break;
      case AppRoute.CatalogSortPopupularType:
        sortedCameras.sort((a, b) => b.rating - a.rating);
        break;
    }

    return sortOrder === AppRoute.CatalogSortDownOrder ? sortedCameras : sortedCameras.reverse();
  }
);

export const getCamera = (state: State) => state[NameSpace.CamerasData].camera.data as Camera;
export const getCameraDataLoadingStatus = (state: State): boolean => state[NameSpace.CamerasData].camera.isLoading;

export const getSimilarCameras = (state: State): Cameras => state[NameSpace.CamerasData].camera.similarCameras;
export const getSimilarCamerasDataLoadingStatus = (state: State): boolean => state[NameSpace.CamerasData].camera.isSimilarCamerasLoading;

export const getPromoCamera = (state: State) => state[NameSpace.CamerasData].promoCamera.data as PromoCamera;
export const getPromoCameraDataLoadingStatus = (state: State): boolean => state[NameSpace.CamerasData].promoCamera.isLoading;
