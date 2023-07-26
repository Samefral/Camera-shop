import { Reviews } from '../types/review';
import { CamerasCategory } from '../const';

const PriceFormatOptions = {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0
} as const;

const DateFormatOptions = {
  day: 'numeric',
  month: 'long'
} as const;

export const formatPrice = (price: number) => price.toLocaleString('ru-RU', PriceFormatOptions);

export const formatDate = (date: string) => new Date(date).toLocaleString('ru-RU', DateFormatOptions);

export const sortReviewsByDate = (reviews: Reviews) => [...reviews].sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt));

export const getCameraCategoryInText = (category: string) => {
  switch (category) {
    case CamerasCategory.fromBackend.photo:
      return CamerasCategory.inText.photo;
    case CamerasCategory.fromBackend.video:
      return CamerasCategory.inText.video;
  }
};
