import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Cameras, Camera, PromoCamera } from '../types/camera.js';
import { Review, Reviews, PostReviewData } from '../types/review.js';
import { APIRoute } from '../const';

async function fetchCameraRating(api: AxiosInstance, cameraId: number) {
  const reviews = (await api.get<Reviews>(`${APIRoute.Cameras}/${cameraId}/${APIRoute.CamerasReviews}`)).data;
  return Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length);
}

export const fetchCamerasAction = createAsyncThunk<Cameras, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Cameras>(APIRoute.Cameras);

    for (let i = 0; i < data.length; i++) {
      data[i].rating = await fetchCameraRating(api, data[i].id);
    }

    return data;
  },
);

export const fetchCameraByIdAction = createAsyncThunk<Camera, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameraById',
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${cameraId}`);
    data.rating = await fetchCameraRating(api, data.id);
    return data;
  },
);

export const fetchSimilarCamerasAction = createAsyncThunk<Cameras, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<Cameras>(`${APIRoute.Cameras}/${cameraId}/${APIRoute.SimilarCameras}`);

    for (let i = 0; i < data.length; i++) {
      data[i].rating = await fetchCameraRating(api, data[i].id);
    }

    return data;
  },
);

export const fetchPromoCameraAction = createAsyncThunk<PromoCamera, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoCamera',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoCamera>(APIRoute.Promo);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Cameras}/${cameraId}/${APIRoute.CamerasReviews}`);
    return data;
  }
);

export const postReviewAction = createAsyncThunk<Review, PostReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({cameraId, userName, advantage, disadvantage, review, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.ReviewPost, {cameraId, userName, advantage, disadvantage, review, rating});
    dispatch(fetchReviewsAction(cameraId));
    return data;
  }
);
