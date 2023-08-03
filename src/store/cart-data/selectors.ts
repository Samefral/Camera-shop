import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Camera, Cameras } from '../../types/camera';

export const getCameraInCartModal = (state: State): Camera => state[NameSpace.CartData].cameraInCartModal as Camera;
export const getCartSuccessModalStatus = (state: State): boolean => state[NameSpace.CartData].successModalOpen;

export const getCartCameras = (state: State): Cameras => state[NameSpace.CartData].cameras;
export const getTotalCartProducts = (state: State): number => state[NameSpace.CartData].totalCount;
export const getTotalCartPrice = (state: State): number => state[NameSpace.CartData].totalPrice;

export const getCartDiscount = (state: State): number => state[NameSpace.CartData].discount;
export const getCartCouponError = (state: State): boolean => state[NameSpace.CartData].discountCouponError;
export const getCartCouponSuccess = (state: State): boolean => state[NameSpace.CartData].discountCopounSuccess;
