import { useAppSelector } from '../../../../hooks';
import { getCameras } from '../../../../store/cameras-data/selectors';
import CameraCard from '../../../camera-card/camera-card';

export const EmptyCamerasListMessageStyle = {
  textAlign: 'center',
  gridColumn: '2'
} as React.CSSProperties;

const EMPTY_CAMERAS_LIST_MESSAGE = 'Камер нет';

function MainCamerasList(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  return (
    <div className="cards catalog__cards">
      {
        cameras.length === 0
          ?
          <h2 style={EmptyCamerasListMessageStyle}>{EMPTY_CAMERAS_LIST_MESSAGE}</h2>
          :
          cameras.slice(0, 5).map((camera) =>
            <CameraCard key={camera.id} camera={camera} />
          )
      }
    </div>
  );
}

export default MainCamerasList;
