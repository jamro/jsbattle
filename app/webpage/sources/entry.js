import 'babel-polyfill';
import App from "./components/App.js";

let stateless = false;
if(window.location.hash) {
  stateless = window.location.hash.substring(1) == 'stateless';
}

ReactDOM.render(
  <App renderer="brody" stateless={stateless} />,
  document.getElementById('root')
);
