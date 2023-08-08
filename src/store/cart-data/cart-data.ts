import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera, Cameras } from '../../types/camera';
import { NameSpace, OrderStatus } from '../../const';
import { fetchDiscountAction, postOrderAction } from '../api-actions';

export type CartData = {
  cameras: Cameras;
  totalPrice: number;
  totalCount: number;
  discount: number;
  discountCoupon: string | null;
  discountCouponError: boolean;
  discountCopounSuccess: boolean;
  cameraInCartModal: Camera | null;
  successModalOpen: boolean;
  orderStatus: string;
};

export const initialState: CartData = {
  cameras: [],
  totalPrice: 0,
  totalCount: 0,
  discount: 0,
  discountCoupon: null,
  discountCouponError: false,
  discountCopounSuccess: false,
  cameraInCartModal: null,
  successModalOpen: false,
  orderStatus: OrderStatus.Null,
};

const updateOnRemoveOrDecrease = (state: CartData, count: number, price: number) => {
  state.totalCount -= count;
  state.totalPrice -= price * count;
};

const clearCart = (state: CartData) => {
  state.cameras = [];
  state.totalCount = 0;
  state.totalPrice = 0;
  state.discount = 0;
  state.discountCoupon = null;
  state.discountCouponError = false;
  state.discountCopounSuccess = false;
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

    setCoupon: (state, action: PayloadAction<string | null>) => {
      state.discountCoupon = action.payload;
    },
    setCouponError: (state, action: PayloadAction<boolean>) => {
      state.discountCouponError = action.payload;
    },
    setCouponSuccess: (state, action: PayloadAction<boolean>) => {
      state.discountCopounSuccess = action.payload;
    },

    setOrderStatus: (state, action: PayloadAction<string>) => {
      state.orderStatus = action.payload;
    },
    clearOrderCart: (state) => clearCart(state),

  },
  extraReducers(builder) {
    builder
      .addCase(fetchDiscountAction.pending, (state) => {
        state.discountCouponError = false;
        state.discountCopounSuccess = false;
      })
      .addCase(fetchDiscountAction.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.discountCopounSuccess = true;
      })
      .addCase(fetchDiscountAction.rejected, (state) => {
        state.discountCouponError = true;
      })

      .addCase(postOrderAction.pending, (state) => {
        state.orderStatus = OrderStatus.Pending;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.orderStatus = OrderStatus.Fulfilled;
        clearCart(state);
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.orderStatus = OrderStatus.Rejected;
      });

  }
});

export const {
  setCameraInCartModal,
  setSuccessModalOpen,
  addCameraToCart,
  decreaseCameraCount,
  setCameraCount,
  removeCameraFromCart,
  setCoupon,
  setCouponError,
  setCouponSuccess,
  setOrderStatus,
  clearOrderCart,
} = cartData.actions;
