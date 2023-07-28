import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HistoryRouter from './hocs/history-route/history-route';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchCamerasAction, fetchPromoCameraAction } from './store/api-actions';
import browserHistory from './browser-history';
import App from './components/app/app';

store.dispatch(fetchCamerasAction());
store.dispatch(fetchPromoCameraAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store = {store}>
    <HistoryRouter history={browserHistory}>
      <ToastContainer />
      <App />
    </HistoryRouter>
  </Provider>
);
