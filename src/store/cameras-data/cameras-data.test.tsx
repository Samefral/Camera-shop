import { camerasData, initialState } from './cameras-data';
import { makeFakeCamera, makeFakePromoCamera } from '../../utils/mocks';
import { fetchCamerasAction, fetchCameraByIdAction, fetchSimilarCamerasAction, fetchPromoCameraAction } from '../api-actions';


const mockCameras = [makeFakeCamera(), makeFakeCamera()];
const mockCamera = makeFakeCamera();
const mockPromoCamera = makeFakePromoCamera();


describe('extraReducers: camerasData', () => {

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialState});
  });


  describe('cameras test', () => {
    it('should set cameras.isLoading to true on fetchCamerasAction.pending', () => {
      expect(
        camerasData.reducer({...initialState}, {type: fetchCamerasAction.pending.type})
      ).toEqual({
        ...initialState,
        cameras: {
          ...initialState.cameras,
          isLoading: true
        }
      });
    });

    it('should update cameras by load cameras + set cameras.loading to false', () => {
      expect(camerasData.reducer({...initialState}, {type: fetchCamerasAction.fulfilled.type, payload: mockCameras}))
        .toEqual({
          ...initialState,
          cameras: {
            ...initialState.cameras,
            data: mockCameras,
            isLoading: false
          }
        });
    });

  });


  describe('cameraById test', () => {
    it('should set camera.isLoading to true on fetchCameraByIdAction.pending', () => {
      expect(
        camerasData.reducer({...initialState}, {type: fetchCameraByIdAction.pending.type})
      ).toEqual({
        ...initialState,
        camera: {
          ...initialState.camera,
          isLoading: true
        }
      });
    });

    it('should update camera by load camera + set camera.loading to false', () => {
      expect(camerasData.reducer({...initialState}, {type: fetchCameraByIdAction.fulfilled.type, payload: mockCamera}))
        .toEqual({
          ...initialState,
          camera: {
            ...initialState.camera,
            data: mockCamera,
            isLoading: false
          }
        });
    });

    it('should set camera.isLoading to false on fetchCameraByIdAction.rejected', () => {
      expect(camerasData.reducer({...initialState}, {type: fetchCameraByIdAction.rejected.type}))
        .toEqual({
          ...initialState,
          camera: {
            ...initialState.camera,
            isLoading: false
          }
        });
    });

  });


  describe('camera.similarCameras test', () => {
    it('should set camera.similarCameras.isSimilarCamerasLoading to true on fetchSimilarCamerasAction.pending', () => {
      expect(
        camerasData.reducer({...initialState}, {type: fetchSimilarCamerasAction.pending.type})
      ).toEqual({
        ...initialState,
        camera: {
          ...initialState.camera,
          isSimilarCamerasLoading: true
        }
      });
    });

    it('should update camera.similarCameras by load similar cameras + set camera.isSimilarCamerasLoading to false', () => {
      expect(camerasData.reducer({...initialState}, {type: fetchSimilarCamerasAction.fulfilled.type, payload: mockCameras}))
        .toEqual({
          ...initialState,
          camera: {
            ...initialState.camera,
            similarCameras: mockCameras,
            isSimilarCamerasLoading: false
          }
        });
    });

    it('should set camera.isSimilarCamerasLoading to false on fetchSimilarCamerasAction.rejected', () => {
      expect(camerasData.reducer({...initialState}, {type: fetchSimilarCamerasAction.rejected.type}))
        .toEqual({
          ...initialState,
          camera: {
            ...initialState.camera,
            isSimilarCamerasLoading: false
          }
        });
    });

  });


  describe('promoCamera test', () => {
    it('should set promoCamera.isLoading to true on fetchPromoCameraAction.pending', () => {
      expect(
        camerasData.reducer({...initialState}, {type: fetchPromoCameraAction.pending.type})
      ).toEqual({
        ...initialState,
        promoCamera: {
          ...initialState.promoCamera,
          isLoading: true
        }
      });
    });

    it('should update promoCamera by load promo camera + set promoCamera.loading to false', () => {
      expect(camerasData.reducer({...initialState}, {type: fetchPromoCameraAction.fulfilled.type, payload: mockPromoCamera}))
        .toEqual({
          ...initialState,
          promoCamera: {
            ...initialState.promoCamera,
            data: mockPromoCamera,
            isLoading: false
          }
        });
    });

    it('should set promoCamera.isLoading to false on fetchPromoCameraAction.rejected', () => {
      expect(camerasData.reducer({...initialState}, {type: fetchPromoCameraAction.rejected.type}))
        .toEqual({
          ...initialState,
          promoCamera: {
            ...initialState.promoCamera,
            isLoading: false
          }
        });
    });

  });


});
