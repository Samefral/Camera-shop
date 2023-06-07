import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCamerasDataLoadingStatus } from '../../store/cameras-data/selectors';
import { AppRoute } from '../../const';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import Layout from '../../pages/layout/layout';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

function App(): JSX.Element {
  const isCamerasDataLoading = useAppSelector(getCamerasDataLoadingStatus);

  if (isCamerasDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout />} >
        <Route
          index
          element={<CatalogPage />}
        />
      </Route>
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
