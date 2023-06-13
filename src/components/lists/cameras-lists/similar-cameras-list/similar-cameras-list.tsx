import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { getSimilarCameras } from '../../../../store/cameras-data/selectors';
import { fetchSimilarCamerasAction } from '../../../../store/api-actions';
import CameraCard from '../../../camera-card/camera-card';

export const EmptyCamerasListMessageStyle = {
  textAlign: 'center',
  gridColumn: '2'
} as React.CSSProperties;

const EMPTY_CAMERAS_LIST_MESSAGE = 'Похожих камер нет';

function SimilarCamerasList(): JSX.Element {
  const cameraId = useParams().id as string;
  const similarCameras = useAppSelector(getSimilarCameras);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSimilarCamerasAction(cameraId));
  }, [dispatch, cameraId]);

  return (
    <div className="product-similar__slider-list">
      {
        similarCameras.length === 0
          ?
          <h2 style={EmptyCamerasListMessageStyle}>{EMPTY_CAMERAS_LIST_MESSAGE}</h2>
          :
          similarCameras.slice(0, 3).map((camera) =>
            <CameraCard key={camera.id} camera={camera} isActive />
          )
      }
    </div>
  );
}

export default SimilarCamerasList;
