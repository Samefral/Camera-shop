import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getfilteredCameras } from '../../../store/cameras-data/selectors';
import { setCurrentSortType, setCurrentSortOrder } from '../../../store/cameras-data/cameras-data';
import { CAMERAS_PER_PAGE } from '../../../const';
import useGetFilterParams from '../../../hooks/useGetFilterParams';
import CameraCard from '../../camera-card/camera-card';
import Pagination from '../../pagination/pagination';

const EmptyCamerasListMessageStyle = {
  textAlign: 'center',
  gridColumn: '2'
} as React.CSSProperties;

const EMPTY_CAMERAS_LIST_MESSAGE = 'По вашему запросу ничего не найдено';

function MainCamerasList(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentFilters = useGetFilterParams();
  const filteredCameras = useAppSelector(getfilteredCameras)(currentFilters, true);

  const currentSortType = useParams().sortType as string;
  const currentSortOrder = useParams().sortOrder as string;

  useEffect(() => {
    dispatch(setCurrentSortType(currentSortType));
    dispatch(setCurrentSortOrder(currentSortOrder));
  }, [currentSortOrder, currentSortType, dispatch]);

  const page = Number(useParams().page);
  const currentPage = page ? page : 1;

  const camerasOnPage = filteredCameras.slice((currentPage - 1) * CAMERAS_PER_PAGE, currentPage * CAMERAS_PER_PAGE);

  return (
    <React.Fragment>
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
      <Pagination cameras={filteredCameras} currentPage={currentPage} currentSortType={currentSortType} currentSortOrder={currentSortOrder} />
    </React.Fragment>
  );
}

export default MainCamerasList;
