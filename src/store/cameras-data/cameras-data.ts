import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchCameraByIdAction, fetchSimilarCamerasAction, fetchPromoCameraAction } from '../api-actions';
import { NameSpace } from '../../const';
import { CameraData } from '../../types/state';

export const initialState: CameraData = {
  cameras: {
    data: [],
    isLoading: false,
    currentSortType: null,
    currentSortOrder: null,
  },
  camera: {
    data: null,
    isLoading: false,
    similarCameras: [],
    isSimilarCamerasLoading: false,
  },
  promoCamera: {
    data: null,
    isLoading: false,
  }
};

export const camerasData = createSlice({
  name: NameSpace.CamerasData,
  initialState,
  reducers: {
    setCurrentSortType: (state, action: PayloadAction<string>) => {
      state.cameras.currentSortType = action.payload;
    },
    setCurrentSortOrder: (state, action: PayloadAction<string>) => {
      state.cameras.currentSortOrder = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.cameras.isLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras.data = action.payload;
        state.cameras.isLoading = false;
      })

      .addCase(fetchCameraByIdAction.pending, (state) => {
        state.camera.isLoading = true;
      })
      .addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
        state.camera.isLoading = false;
        state.camera.data = action.payload;
      })
      .addCase(fetchCameraByIdAction.rejected, (state) => {
        state.camera.isLoading = false;
      })

      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.camera.isSimilarCamerasLoading = true;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.camera.isSimilarCamerasLoading = false;
        state.camera.similarCameras = action.payload;
      })
      .addCase(fetchSimilarCamerasAction.rejected, (state) => {
        state.camera.isSimilarCamerasLoading = false;
      })

      .addCase(fetchPromoCameraAction.pending, (state) => {
        state.promoCamera.isLoading = true;
      })
      .addCase(fetchPromoCameraAction.fulfilled, (state, action) => {
        state.promoCamera.isLoading = false;
        state.promoCamera.data = action.payload;
      })
      .addCase(fetchPromoCameraAction.rejected, (state) => {
        state.promoCamera.isLoading = false;
      });


  }
});

export const { setCurrentSortType, setCurrentSortOrder } = camerasData.actions;
