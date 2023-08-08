import { datatype, random, name, system, date } from 'faker';
import { Camera, PromoCamera } from '../types/camera';
import { Review } from '../types/review';


export const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: random.word(),
  vendorCode: random.word(),
  type: random.word(),
  category: random.word(),
  description: random.words(),
  level: random.word(),
  price: datatype.number(),
  reviewCount: datatype.number(),
  rating: datatype.number(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
  count: 1,
} as Camera);

export const makeFakePromoCamera = (): PromoCamera => ({
  id: datatype.number(),
  name: random.word(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
} as PromoCamera);

export const makeFakeReview = (): Review => ({
  id: datatype.uuid(),
  createAt: String(date.recent()),
  cameraId: datatype.number(),
  userName: name.findName(),
  advantage: random.words(),
  disadvantage: random.words(),
  review: random.words(),
  rating: datatype.number(),
} as Review);

