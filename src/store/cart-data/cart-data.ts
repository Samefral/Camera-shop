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

const updateOnRemoveOrDecrease = (state: CartData, count: number, price: number) => {
  state.totalCount -= count;
  state.totalPrice -= price * count;
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
        updateOnRemoveOrDecrease(state, 1, action.payload.price);
      }
    },
    setCameraCount: (state, action: PayloadAction<{id: number; count: number}>) => {
      const cameraToUpdate = state.cameras.find((camera) => camera.id === action.payload.id);

      if (cameraToUpdate) {
        updateOnRemoveOrDecrease(state, cameraToUpdate.count, cameraToUpdate.price);
        cameraToUpdate.count = action.payload.count;
        state.totalCount += action.payload.count;
        state.totalPrice += cameraToUpdate.price * action.payload.count;
      }
    },
    removeCameraFromCart: (state, action: PayloadAction<Camera>) => {
      state.cameras = state.cameras.filter((camera) => camera.id !== action.payload.id);
      updateOnRemoveOrDecrease(state, action.payload.count, action.payload.price);
    },

  },
});

export const {
  setCameraInCartModal,
  setSuccessModalOpen,
  addCameraToCart,
  decreaseCameraCount,
  setCameraCount,
  removeCameraFromCart
} = cartData.actions;
