import 'babel-polyfill';
var App = require('./components/App.js');

var stateless = false;
if(window.location.hash) {
  stateless = window.location.hash.substring(1) == 'stateless';
}

ReactDOM.render(
  <App renderer="brody" stateless={stateless} />,
  document.getElementById('root')
);
