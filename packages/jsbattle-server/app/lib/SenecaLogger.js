module.exports = function (level) {
  function SenecaLogger () {}

  SenecaLogger.preload = function () {

    var logLevelMap = {};
    logLevelMap['FATAL'] = 0;
    logLevelMap['ERROR'] = 1;
    logLevelMap['WARN'] = 2;
    logLevelMap['INFO'] = 3;
    logLevelMap['DEBUG'] = 4;

    var logThreshold = logLevelMap[String(level).toUpperCase()] || 4;

    function pad (content, length) {
      content = content || '';

      while (content.length < length) {
        content = content + ' ';
      }

      return content;
    }

    function adapter (context, payload) {
      var when = pad((new Date(payload.when)).toISOString().replace("T", " ").replace("Z", ""), 25);
      var level = pad(payload.level_name || '-', 8).toUpperCase();
      var text = payload.notice || payload.pattern || payload.msg || '-';
      var plugin = pad(payload.plugin_name || '-', 15);

      var logLevel = logLevelMap[payload.level_name.toUpperCase()] || 4;

      if(logLevel > logThreshold) return;

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
