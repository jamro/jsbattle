import io from 'socket.io-client';
import {
  wsConnected,
  wsDisconnected
} from '../actions/wsAction.js';
import {
  refreshLeague
} from '../actions/leagueAction.js';

const eventMap = {
  "client.league.battleCompleted": refreshLeague
};

export default function socketMiddleware(store) {

  let socket = null;

  const onOpen = (event) => {
    store.dispatch(wsConnected(event.target.url));
  };

  const onClose = () => {
    store.dispatch(wsDisconnected());
  };

  const onEvent = (event) => {
    if(eventMap[event.event]) {
      console.log(`Event '${event.event}' received... processing`);
      store.dispatch(eventMap[event.event](event.payload));
    } else {
      console.log(`Event '${event.event}' received... skipping`);
    }
  };

  return function(next) {
    return function (action) {
      switch (action.type) {
        case 'WS_CONNECT':
          if (socket !== null) {
            socket.close();
          }

          // connect to the remote host
          socket = io(action.host, {path: '/api/events'});

          // websocket handlers
          socket.on("event", onEvent);
          socket.onclose = onClose;
          socket.onopen = onOpen;

          break;
        case 'WS_DISCONNECT':
          if (socket !== null) {
            socket.close();
          }
          socket = null;
          break;
        default:
          return next(action);
      }
    };
  };
}
