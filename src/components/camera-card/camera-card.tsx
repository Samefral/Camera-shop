import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utils/utils';

type ProductCardProps = {
  camera: Camera;
  isActive: boolean;
};

function CameraCard({camera, isActive}: ProductCardProps): JSX.Element {
  const cardClassName = isActive ? 'product-card is-active' : 'product-card';

  return (
    <div className={cardClassName} data-testid="camera-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImg2x} 2x`} />
          <img
            src={camera.previewImg}
            srcSet={`${camera.previewImg2x} 2x`}
            width="280"
            height="240"
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
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
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: 3</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}
          </p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">
          Купить
        </button>
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Product, {
          id: String(camera.id),
          tab: AppRoute.ProductDescriptionTab
        })}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CameraCard;
