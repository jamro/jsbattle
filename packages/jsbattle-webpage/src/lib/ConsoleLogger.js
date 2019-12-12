export default class ConsoleLogger {

  apply(c) {
    let now = new Date().getTime();
    function wrapFn(name) {
      c["__" + name + "_copy"] = c[name];
      c[name] = (...args) => {
        let timestamp = new Date().getTime() - now + "ms | ";
        while(timestamp.length < 10) {
          timestamp = " " + timestamp;
        }
        args.unshift(timestamp);
        c["__" + name + "_copy"].apply(null, args);
      };
    }

    wrapFn('log');
    wrapFn('error');
    wrapFn('trace');
    wrapFn('warn');
    wrapFn('info');
  }

}
