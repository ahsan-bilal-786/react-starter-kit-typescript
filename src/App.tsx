import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import store from 'store/index';
import { Router } from 'react-router-dom';
import { AppRouter } from 'routes';

const history = createBrowserHistory();

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <AppRouter />
      </Router>
    </Provider>
  );
};

export default App;
