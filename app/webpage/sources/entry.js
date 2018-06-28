import 'babel-polyfill';
import App from "./components/App.js";

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

ReactDOM.render(
  <App renderer="brody" stateless={stateless} />,
  document.getElementById('root')
);
