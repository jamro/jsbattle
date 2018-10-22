import 'babel-polyfill';
import App from "./components/App.js";
import UbdPlayer from "./components/screen/UbdPlayer/UbdPlayer.js";

function getHashParameters() {
  let serial = window.location.hash ? window.location.hash.substring(1) : "";
  let params = serial.split("&");
  let result = [];
  for(let keyValue of params) {
    keyValue = keyValue.split("=", 2);
    result[keyValue[0]] = keyValue[1] ? keyValue[1] : null;
  }

  return result;
}

let params = getHashParameters();
let stateless = (params.stateless !== undefined && params.stateless != false);
let ubdPlayer = (params.ubdPlayer !== undefined && params.ubdPlayer != false);
let replayBattleId = (params.replay !== undefined && params.replay != false) ? params.replay : null;

let content;
if(ubdPlayer) {
  content = <UbdPlayer />;
} else {
  content = <App
      renderer="brody"
      stateless={stateless}
      replay={replayBattleId}
    />;
}

ReactDOM.render(
  content,
  document.getElementById('root')
);
