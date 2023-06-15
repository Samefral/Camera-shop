import 'swiper/swiper-bundle.min.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { getSimilarCameras, getSimilarCamerasDataLoadingStatus } from '../../../../store/cameras-data/selectors';
import { fetchSimilarCamerasAction } from '../../../../store/api-actions';
import CameraCard from '../../../camera-card/camera-card';
import LoadingScreen from '../../../../pages/loading-screen/loading-screen';

function SimilarCamerasList(): JSX.Element {
  const cameraId = useParams().id as string;
  const similarCameras = useAppSelector(getSimilarCameras);
  const isSimilarCamerasLoading = useAppSelector(getSimilarCamerasDataLoadingStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSimilarCamerasAction(cameraId));
  }, [dispatch, cameraId]);

  if (isSimilarCamerasLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page-content__section" style={similarCameras.length === 0 ? {display: 'none'} : {}}>
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider" >
            <Swiper
              className="product-similar__slider-list"
              modules={[Navigation]}
              spaceBetween={32}
              slidesPerView={3}
              slidesPerGroup={3}
              navigation={
                {
                  nextEl: '.slider-controls--next',
                  prevEl: '.slider-controls--prev'
                }
              }
            >
              {similarCameras.map((camera) => (
                <SwiperSlide key={camera.id} >
                  <CameraCard key={camera.id} camera={camera} isActive />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              style={{ pointerEvents: 'auto' }}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              style={{ pointerEvents: 'auto' }}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimilarCamerasList;
