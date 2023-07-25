import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Layout from '../../pages/layout/layout';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import CartPage from '../../pages/cart-page/cart-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />} >
          <Route
            index
            element={<CatalogPage />}
          />
          <Route path={AppRoute.Catalog} >
            <Route index element={<CatalogPage />}/>
            <Route path={AppRoute.CatalogSort} element={<CatalogPage />} />
          </Route>
          <Route
            path={AppRoute.Product}
            element={<ProductPage />}
          />
          <Route
            path={AppRoute.Cart}
            element={<CartPage />}
          />
        </Route>
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
