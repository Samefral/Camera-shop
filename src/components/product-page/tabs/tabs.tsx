import { useNavigate, useParams, generatePath } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { getCamera } from '../../../store/cameras-data/selectors';
import { AppRoute } from '../../../const';
import CharacteristicsTab from './characteristics-tab/characteristics-tab';
import DescriptionTab from './description-tab/description-tab';

function Tabs(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const camera = useAppSelector(getCamera);
  const activeTab = params.tab;

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          onClick={() => {
            navigate(generatePath(AppRoute.Product, {
              id: String(camera.id),
              tab: AppRoute.ProductCharacteristicsTab
            }));
          }}
          className={activeTab === AppRoute.ProductCharacteristicsTab ? 'tabs__control is-active' : 'tabs__control'}
          type="button"
        >
          Характеристики
        </button>
        <button
          onClick={() => {
            navigate(generatePath(AppRoute.Product, {
              id: String(camera.id),
              tab: AppRoute.ProductDescriptionTab
            }));
          }}
          className={activeTab === AppRoute.ProductDescriptionTab ? 'tabs__control is-active' : 'tabs__control'}
          type="button"
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <CharacteristicsTab camera={camera} isActive={activeTab === AppRoute.ProductCharacteristicsTab} />
        <DescriptionTab camera={camera} isActive={activeTab === AppRoute.ProductDescriptionTab} />
      </div>
    </div>

  );
}

export default Tabs;
