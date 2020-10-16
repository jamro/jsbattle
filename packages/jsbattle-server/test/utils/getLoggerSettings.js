const path = require('path');

function getLoggerSettings(baseDir, filename, state, postfix) {
	if(postfix) {
		postfix = '-' + postfix;
	} else {
		postfix = '';
	}
  if(!this.testTime) {
    this.testTime = new Date().getTime();
  }
	const output =	path.resolve( 
		baseDir, 
		'logs', 
		this.testTime.toString() + '-' + path.basename(filename, '.spec.js').replace(/\./g, '-'),
		(state.currentTestName || 'Test Case ' + Math.round(Math.random()*0xffffff).toString(16)) + postfix + '.log'
	);
	return {
		loglevel: 'info',
		logger: {
			type: "File",
			options: {
				folder: path.dirname(output),
				filename: path.basename(output),
				formatter: "short",
				interval: 10
			}
		}
	};
}

module.exports = getLoggerSettings;