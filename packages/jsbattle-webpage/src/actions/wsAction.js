import {
  WS_CONNECT,
  WS_CONNECTED,
  WS_DISCONNECT,
  WS_DISCONNECTED,
} from './actionTypes.js';

const host = '/';

export const wsConnect = (h) => ({type: WS_CONNECT, host: h || host});
export const wsConnected = (h) => ({type: WS_CONNECTED, host: h || host});
export const wsDisconnect = (h) => ({type: WS_DISCONNECT, host: h || host});
export const wsDisconnected = (h) => ({type: WS_DISCONNECTED, host: h || host});
