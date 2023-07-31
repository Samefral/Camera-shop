import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera, Cameras } from '../../types/camera';
import { NameSpace } from '../../const';

export type CartData = {
  cameras: Cameras;
  totalPrice: number;
  totalCount: number;
  cameraInCartModal: Camera | null;
  successModalOpen: boolean;
};

const initialState: CartData = {
  cameras: [],
  totalPrice: 0,
  totalCount: 0,
  cameraInCartModal: null,
  successModalOpen: false,
};

export const cartData = createSlice({
  name: NameSpace.CartData,
  initialState,
  reducers: {
    setCameraInCartModal: (state, action: PayloadAction<Camera | null>) => {
      state.cameraInCartModal = action.payload;
    },
    setSuccessModalOpen: (state, action: PayloadAction<boolean>) => {
      state.successModalOpen = action.payload;
    },

    addCameraToCart: (state, action: PayloadAction<Camera>) => {
      const addedCamera = state.cameras.find((camera) => camera.id === action.payload.id);

      if (addedCamera) {
        addedCamera.count++;
      } else {
        state.cameras.push({ ...action.payload, count: 1 });
      }

      state.totalCount += 1;
      state.totalPrice += action.payload.price;
    },
    decreaseCameraCount: (state, action: PayloadAction<Camera>) => {
      const cameraToDecrease = state.cameras.find((camera) => camera.id === action.payload.id);

      if (cameraToDecrease) {
        cameraToDecrease.count -= 1;
        state.totalCount -= 1;
        state.totalPrice -= action.payload.price;
      }
    },
    removeCameraFromCart: (state, action: PayloadAction<Camera>) => {
      state.cameras = state.cameras.filter((camera) => camera.id !== action.payload.id);
      state.totalCount -= action.payload.count;
      state.totalPrice -= action.payload.price * action.payload.count;
    },

  },
});

export const {
  setCameraInCartModal,
  setSuccessModalOpen,
  addCameraToCart,
  decreaseCameraCount,
  removeCameraFromCart
} = cartData.actions;
