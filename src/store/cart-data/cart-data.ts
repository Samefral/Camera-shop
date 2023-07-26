import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera, Cameras } from '../../types/camera';
import { NameSpace } from '../../const';

export type CartData = {
  cartCameras: Cameras;
  addModalOpen: boolean;
  successModalOpen: boolean;
};

const initialState: CartData = {
  cartCameras: [],
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
    },

  },
});

export const {
  setAddModalOpen,
  setSuccessModalOpen,
  addCameraToCart,
} = cartData.actions;
