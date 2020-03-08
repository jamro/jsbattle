import 'babel-polyfill';
import ConsoleLogger from './lib/ConsoleLogger.js';

let logger = new ConsoleLogger();
logger.apply(console);

const root = document.getElementById("root");
root.innerHTML = 'Loading...';


function exposeActions(actions, store) {
  let actionNameList = Object.keys(actions);
  if(!window.appController) {
    window.appController = {};
  }
  for(let actionName of actionNameList) {
    window.appController[actionName] = (...args) => {
      store.dispatch(actions[actionName].apply(null, args));
    };
  }
}

async function loadWebpage() {
  const {default: App} = await import(/* webpackChunkName: "app" */ './containers/App.js');
  const coreAction = await import(/* webpackChunkName: "app" */ './actions/coreAction.js');
  const challengeAction = await import(/* webpackChunkName: "app" */ './actions/challengeAction.js');
  const sandboxAction = await import(/* webpackChunkName: "app" */ './actions/sandboxAction.js');
  const statsAction = await import(/* webpackChunkName: "app" */ './actions/statsAction.js');
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
  //await import(/* webpackChunkName: "lib" */ 'jsbattle-react');

  let storeEnhancers;
  if(DEBUG_MODE) {
    storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } else {
    storeEnhancers = compose;
  }

  function reduxLogger() {
    return function(next) {
      return function (action) {
        console.log('Redux dispatch:', action.type || '<<no type>>');
        return next(action);
      };
    };
  }

  function errorHandler() {
    return function(next) {
      return function (action) {
        if(action.payload instanceof Error) {
          action.error = true;
        }
        return next(action);
      };
    };
  }

  const store = createStore(
    reducer,
    storeEnhancers(applyMiddleware(errorHandler, reduxLogger, thunk))
  );

  root.innerHTML = '';

  exposeActions(coreAction, store);
  exposeActions(challengeAction, store);
  exposeActions(sandboxAction, store);
  exposeActions(statsAction, store);
  window.appController.store = store;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );

}

loadWebpage().then();
