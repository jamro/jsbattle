importScripts('tank.js');

var onmessageOrig = onmessage;

onmessage = function(event) {
  if(event.data.command == 'init' && event.data.code)
  eval(event.data.code);
  onmessageOrig(event);
}
