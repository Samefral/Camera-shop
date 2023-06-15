import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';
import { getCameras } from '../../../../store/cameras-data/selectors';
import { CAMERAS_PER_PAGE } from '../../../../const';
import CameraCard from '../../../camera-card/camera-card';

const EmptyCamerasListMessageStyle = {
  textAlign: 'center',
  gridColumn: '2'
} as React.CSSProperties;

const EMPTY_CAMERAS_LIST_MESSAGE = 'Камер нет';

function MainCamerasList(): JSX.Element {
  const currentPage = Number(useParams().page);
  const cameras = useAppSelector(getCameras);
  const camerasOnPage = cameras.slice((currentPage - 1) * CAMERAS_PER_PAGE, currentPage * CAMERAS_PER_PAGE);

  return (
    <div className="cards catalog__cards">
      {
        camerasOnPage.length === 0
          ?
          <h2 style={EmptyCamerasListMessageStyle}>{EMPTY_CAMERAS_LIST_MESSAGE}</h2>
          :
          camerasOnPage.map((camera) =>
            <CameraCard key={camera.id} camera={camera} isActive={false} />
          )
      }
    </div>
  );
}

export default MainCamerasList;
