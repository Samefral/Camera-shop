export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:page',
  CatalogSort = ':sortType/:sortOrder',
  CatalogSortPopupularType = 'popular',
  CatalogSortPriceType = 'price',
  CatalogSortUpOrder = 'up',
  CatalogSortDownOrder = 'down',
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
  Filters = 'FILTERS'
}

export const CamerasFilters = {
  Price: {
    minParamName: 'price_gte',
    maxParamName: 'price_lte',
  },
  Category: {
    paramName: 'category',
    values: {
      photo: 'Фотоаппарат',
      video: 'Видеокамера',
    }
  },
  Type: {
    paramName: 'type',
    values: {
      digital: 'Цифровая',
      film: 'Плёночная',
      instant: 'Моментальная',
      collection: 'Коллекционная',
    }
  },
  Level: {
    paramName: 'level',
    values: {
      zero: 'Нулевой',
      amateur: 'Любительский',
      professional: 'Профессиональный',
    },
  }
} as const;

export const REDIRECT_TO_ROUTE_ACTION_TYPE = '/redirectToRoute';
export const CAMERAS_PER_PAGE = 9;
