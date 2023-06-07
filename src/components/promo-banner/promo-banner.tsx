import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getPromoCamera, getPromoCameraDataLoadingStatus } from '../../store/cameras-data/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function PromoBanner(): JSX.Element {
  const promoCamera = useAppSelector(getPromoCamera);
  const isPromoCameraDataLoading = useAppSelector(getPromoCameraDataLoadingStatus);

  if (isPromoCameraDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${promoCamera.previewImgWebp}, ${promoCamera.previewImg2x} 2x`} />
        <img
          src={promoCamera.previewImg}
          srcSet={`${promoCamera.previewImg2x} 2x`}
          width="1280"
          height="280"
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{promoCamera.name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to="#">Подробнее</Link>
      </p>
    </div>
  );
}

export default PromoBanner;
