import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCameraByIdAction } from '../../store/api-actions';
import { getCamera, getCameraDataLoadingStatus } from '../../store/cameras-data/selectors';
import { formatPrice } from '../../utils/utils';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundPage from '../not-found-page/not-found-page';
import Breadcrumbs from '../../components/product-page/breadcrumbs/breadcrumbs';
import SimilarCamerasList from '../../components/lists/cameras-lists/similar-cameras-list/similar-cameras-list';
import Tabs from '../../components/product-page/tabs/tabs';
import Reviews from '../../components/product-page/reviews/reviews';

function ProductPage(): JSX.Element {
  const camera = useAppSelector(getCamera);
  const isCameraDataLoading = useAppSelector(getCameraDataLoadingStatus);

  const cameraId = useParams().id as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCameraByIdAction(cameraId));
  }, [dispatch, cameraId]);

  if (isCameraDataLoading) {
    return <LoadingScreen />;
  }

  if (!camera) {
    return <NotFoundPage />;
  }

  return (
    <React.Fragment>
      <main>
        <Helmet>
          <title>{camera.name} - Фотошоп</title>
        </Helmet>
        <div className="page-content">
          <Breadcrumbs />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
                    <img src={camera.previewImg} srcSet={camera.previewImg2x} width="560" height="480" alt={camera.name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{camera.name}</h1>
                  <div className="rate product__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <p className="visually-hidden">Рейтинг: 4</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{formatPrice(camera.price)}</p>
                  <button className="btn btn--purple" type="button">
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
          <Reviews />
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </React.Fragment>
  );
}

export default ProductPage;