import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera, Cameras } from '../../types/camera';
import { NameSpace } from '../../const';

export type CartData = {
  cartCameras: Cameras;
  totalPrice: number;
  addModalOpen: boolean;
  successModalOpen: boolean;
};

const initialState: CartData = {
  cartCameras: [],
  totalPrice: 0,
  addModalOpen: false,
  successModalOpen: false,
};

export const cartData = createSlice({
  name: NameSpace.CartData,
  initialState,
  reducers: {
    setAddModalOpen: (state, action: PayloadAction<boolean>) => {
      state.addModalOpen = action.payload;
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

      state.totalPrice += action.payload.price;
    },
    removeCameraFromCart: (state, action: PayloadAction<Camera>) => {
      state.cartCameras = state.cartCameras.filter((camera) => camera.id !== action.payload.id);
      state.totalPrice -= action.payload.price * action.payload.count;
    },

  },
});

export const {
  setAddModalOpen,
  setSuccessModalOpen,
  addCameraToCart,
  removeCameraFromCart
} = cartData.actions;
