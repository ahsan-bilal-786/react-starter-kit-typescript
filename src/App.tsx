import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import store from 'store/index';
import { Router } from 'react-router-dom';
import { AppRouter } from 'routes';
import { ToastContainer } from 'react-toastify';

const history = createBrowserHistory();

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                />
        <AppRouter />
      </Router>
    </Provider>
  );
};

export default App;
