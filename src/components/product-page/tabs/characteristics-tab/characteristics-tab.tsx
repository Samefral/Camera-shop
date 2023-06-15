import { Camera } from '../../../../types/camera';

type CharacteristicsTabProps = {
  camera: Camera;
  isActive: boolean;
}

function CharacteristicsTab({camera, isActive}: CharacteristicsTabProps): JSX.Element {
  const tabClassName = isActive ? 'tabs__element is-active' : 'tabs__element';

  return (
    <div className={tabClassName}>
      <ul className="product__tabs-list">
        <li className="item-list">
          <span className="item-list__title">Артикул:</span>
          <p className="item-list__text">{camera.vendorCode}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Категория:</span>
          <p className="item-list__text">{camera.category}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Тип камеры:</span>
          <p className="item-list__text">{camera.type}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Уровень:</span>
          <p className="item-list__text">{camera.level}</p>
        </li>
      </ul>
    </div>
  );
}

export default CharacteristicsTab;
