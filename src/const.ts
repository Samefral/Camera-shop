export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:page',
  Product = '/product/:id/:tab',
  ProductDescriptionTab = 'description',
  ProductCharacteristicsTab = 'characteristics',
  Guarantees = '/guarantees',
  Delivery = '/delivery',
  About = '/about',
  Cart = '/cart',
}

export enum APIRoute {
  Cameras = '/cameras',
  SimilarCameras = 'similar',
  CamerasReviews = 'reviews',
  ReviewPost = '/reviews',
  Promo = '/promo',
  CouponVerification = '/coupons',
  OrderPost = '/orders',
}

export enum NameSpace {
  CamerasData = 'CAMERAS_DATA',
  ReviewsData = 'REVIEWS_DATA',
}

export const REDIRECT_TO_ROUTE_ACTION_TYPE = '/redirectToRoute';
export const CAMERAS_PER_PAGE = 9;
