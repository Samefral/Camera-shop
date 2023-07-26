import React, { useEffect } from 'react';
import { useParams, useNavigate, generatePath } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCameraByIdAction, fetchSimilarCamerasAction, fetchReviewsAction } from '../../store/api-actions';
import { setAddModalOpen } from '../../store/cart-data/cart-data';
import { AppRoute } from '../../const';
import { getCamera, getCameraDataLoadingStatus } from '../../store/cameras-data/selectors';
import { formatPrice } from '../../utils/utils';
import LoadingScreen from '../loading-screen/loading-screen';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import StarRating from '../../components/star-rating/star-rating';
import SimilarCamerasList from '../../components/cameras-lists/similar-cameras-list/similar-cameras-list';
import Tabs from '../../components/product-page/tabs/tabs';
import ReviewsList from '../../components/product-page/product-reviews/reviews-list/reviews-list';
import AddReviewModal from '../../components/product-page/product-reviews/add-review-modal/add-review-modal';
import AddToCartModal from '../../components/add-to-cart-modal/add-to-cart-modal';
import UpBtn from '../../components/product-page/up-btn/up-btn';

function ProductPage(): JSX.Element {
  const camera = useAppSelector(getCamera);
  const isCameraDataLoading = useAppSelector(getCameraDataLoadingStatus);

  const cameraId = Number(useParams().id);
  const activeTab = useParams().tab;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCameraByIdAction(cameraId));
    dispatch(fetchSimilarCamerasAction(cameraId));
    dispatch(fetchReviewsAction(cameraId));
  }, [dispatch, cameraId]);

  useEffect(() => {
    if (activeTab !== AppRoute.ProductCharacteristicsTab && activeTab !== AppRoute.ProductDescriptionTab) {
      navigate(generatePath(AppRoute.Product, {id: String(cameraId), tab: AppRoute.ProductDescriptionTab}));
    }
  }, [activeTab, cameraId, navigate]);

  if (isCameraDataLoading || !camera) {
    return <LoadingScreen />;
  }

  return (
    <React.Fragment>
      <main>
        <Helmet>
          <title>{camera.name} - Фотошоп</title>
        </Helmet>
        <div className="page-content">
          <Breadcrumbs crumbName={camera.name} />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`}
                    />
                    <img
                      src={camera.previewImg}
                      srcSet={camera.previewImg2x}
                      width="560"
                      height="480"
                      alt={camera.name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{camera.name}</h1>
                  <div className="rate product__rate">
                    <StarRating rating={camera.rating} id={camera.id} />
                    <p className="visually-hidden">Рейтинг: {camera.rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)}
                  </p>
                  <button onClick={() => dispatch(setAddModalOpen(true))} className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>
                  <Tabs />
                </div>
              </div>
            </section>
          </div>
          <SimilarCamerasList />
          <ReviewsList />
        </div>
        <AddReviewModal />
        <AddToCartModal camera={camera}/>
      </main>
      <UpBtn />
    </React.Fragment>
  );
}

export default ProductPage;
