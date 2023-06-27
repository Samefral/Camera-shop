import { Camera } from '../../../../types/camera';

type DescriptionTabProps = {
  camera: Camera;
  isActive: boolean;
}

function DescriptionTab({camera, isActive}: DescriptionTabProps): JSX.Element {
  const tabClassName = isActive ? 'tabs__element is-active' : 'tabs__element';

  return (
    <div className={tabClassName} data-testid="description-tab">
      <div className="product__tabs-text">
        <p>{camera.description}</p>
      </div>
    </div>
  );
}

export default DescriptionTab;
