import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from 'store/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from 'routes';
import { ToastContainer } from 'react-toastify';

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer
          position='top-right'
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
