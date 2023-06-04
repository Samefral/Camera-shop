import { combineReducers } from '@reduxjs/toolkit';
import { CamerasData } from './cameras-data/cameras-data';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.CamerasData]: CamerasData.reducer,
});
