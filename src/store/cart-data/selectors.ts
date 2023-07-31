import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Camera, Cameras } from '../../types/camera';

export const getCameraInCartModal = (state: State): Camera => state[NameSpace.CartData].cameraInCartModal as Camera;
export const getSuccessModalOpenStatus = (state: State): boolean => state[NameSpace.CartData].successModalOpen;

export const getCartCameras = (state: State): Cameras => state[NameSpace.CartData].cartCameras;
export const getTotalCartProducts = (state: State): number => state[NameSpace.CartData].totalCount;
export const getTotalPrice = (state: State): number => state[NameSpace.CartData].totalPrice;
