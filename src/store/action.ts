import { createAction } from '@reduxjs/toolkit';
import { REDIRECT_TO_ROUTE_ACTION_TYPE } from '../const';

export const redirectToRoute = createAction<string>(REDIRECT_TO_ROUTE_ACTION_TYPE);
