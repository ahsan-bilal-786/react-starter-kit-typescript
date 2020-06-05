import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'store/reducer';
import thunk from 'redux-thunk';

const storeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

export default store;
