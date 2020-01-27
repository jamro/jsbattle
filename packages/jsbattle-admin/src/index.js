import App from "./containers/App.js";
import ReactDOM from "react-dom";
import React from "react";
import "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  createStore,
  compose,
  applyMiddleware
} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  storeEnhancers(applyMiddleware(thunk))
);
const root = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
