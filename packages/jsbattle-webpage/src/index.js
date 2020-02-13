import 'babel-polyfill';
import ConsoleLogger from './lib/ConsoleLogger.js';

let logger = new ConsoleLogger();
logger.apply(console);

const root = document.getElementById("root");
root.innerHTML = 'Loading...';

async function loadWebpage() {
  const {default: App} = await import(/* webpackChunkName: "app" */ './containers/App.js');
  const actions = await import(/* webpackChunkName: "app" */ './actions');
  const {default: ReactDOM} = await import(/* webpackChunkName: "lib" */ 'react-dom');
  const {default: React} = await import(/* webpackChunkName: "lib" */ 'react');
  const {Provider} = await import(/* webpackChunkName: "lib" */ 'react-redux');
  const {default: thunk} = await import(/* webpackChunkName: "lib" */ 'redux-thunk');
  const {default: reducer} = await import(/* webpackChunkName: "app" */ './reducers');
  await import(/* webpackChunkName: "lib" */ 'react-router-dom');
  const {
    createStore,
    compose,
    applyMiddleware
  } = await import(/* webpackChunkName: "lib" */ 'redux');
  await import(/* webpackChunkName: "engine" */ 'jsbattle-engine');

  let storeEnhancers;
  if(DEBUG_MODE) {
    storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } else {
    storeEnhancers = compose;
  }

  function reduuxLogger() {
    return function(next) {
      return function (action) {
        console.log('Redux dispatch:', action.type || '<<no type>>');
        return next(action);
      };
    };
  }

  const store = createStore(
    reducer,
    storeEnhancers(applyMiddleware(reduuxLogger, thunk))
  );

  root.innerHTML = '';

  store.dispatch(actions.getSettings());

  let actionNameList = Object.keys(actions);
  window.appController = {};
  for(let actionName of actionNameList) {
    window.appController[actionName] = (...args) => {
      store.dispatch(actions[actionName].apply(null, args));
    };
  }

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );

}

loadWebpage().then();
