import { combineReducers } from '@reduxjs/toolkit';
import { camerasData } from './cameras-data/cameras-data';
import { reviewsData } from './reviews-data/reviews-data';
import { cartData } from './cart-data/cart-data';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.CamerasData]: camerasData.reducer,
  [NameSpace.ReviewsData]: reviewsData.reducer,
  [NameSpace.CartData]:  cartData.reducer,
});
