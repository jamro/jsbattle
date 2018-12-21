module.exports = function (initLogLevel) {
  function SenecaLogger () {}


  SenecaLogger.logLevelToInt = function(level) {
    var logLevelMap = [];
    logLevelMap['NONE'] = -1;
    logLevelMap['FATAL'] = 0;
    logLevelMap['ERROR'] = 1;
    logLevelMap['WARN'] = 2;
    logLevelMap['INFO'] = 3;
    logLevelMap['DEBUG'] = 4;

    return logLevelMap[String(level).toUpperCase()] || 4;
  }

  SenecaLogger.setLogLevel = function(level) {
    SenecaLogger.logThreshold = SenecaLogger.logLevelToInt(level);
  }


  SenecaLogger.preload = function () {
    var seneca = this;

    SenecaLogger.setLogLevel(initLogLevel);

    function pad (content, length) {
      content = content || '';

      while (content.length < length) {
        content = content + ' ';
      }

      return content;
    }

    function adapter (context, payload) {
      var when = pad((new Date(payload.when)).toISOString().replace("T", " ").replace("Z", ""), 25);
      var level = pad(payload.level || '-', 8).toUpperCase();
      var text = payload.notice || payload.info || payload.pattern || '-';
      var plugin = pad(payload.plugin_name || '-', 15);

      var logLevel = SenecaLogger.logLevelToInt(payload.level.toUpperCase());

      if(logLevel > SenecaLogger.logThreshold) return;

      console.log(when, level, plugin, text);
    }

    return {
      extend: {
        logger: adapter
      }
    };
  };

  return SenecaLogger;
};
