import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Cameras } from '../../types/camera';

export const getAddModalOpenStatus = (state: State): boolean => state[NameSpace.CartData].addModalOpen;
export const getSuccessModalOpenStatus = (state: State): boolean => state[NameSpace.CartData].successModalOpen;

export const getCartCameras = (state: State): Cameras => state[NameSpace.CartData].cartCameras;
export const getTotalPrice = (state: State): number => state[NameSpace.CartData].totalPrice;
