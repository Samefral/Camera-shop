import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera, Cameras } from '../../types/camera';
import { NameSpace } from '../../const';

export type CartData = {
  cartCameras: Cameras;
  totalPrice: number;
  totalCount: number;
  cameraInCartModal: Camera | null;
  successModalOpen: boolean;
};

const initialState: CartData = {
  cartCameras: [],
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
      const addedCamera = state.cartCameras.find((camera) => camera.id === action.payload.id);

      if (addedCamera) {
        addedCamera.count++;
      } else {
        state.cartCameras.push({ ...action.payload, count: 1 });
      }

      state.totalCount += 1;
      state.totalPrice += action.payload.price;
    },
    removeCameraFromCart: (state, action: PayloadAction<Camera>) => {
      state.cartCameras = state.cartCameras.filter((camera) => camera.id !== action.payload.id);
      state.totalCount -= action.payload.count;
      state.totalPrice -= action.payload.price * action.payload.count;
    },

  },
});

export const {
  setCameraInCartModal,
  setSuccessModalOpen,
  addCameraToCart,
  removeCameraFromCart
} = cartData.actions;
