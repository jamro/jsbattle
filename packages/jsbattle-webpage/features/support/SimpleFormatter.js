const { Status, SummaryFormatter } = require('cucumber');

const STATUS_CHARACTER_MAPPING = {
  [Status.AMBIGUOUS]: 'A',
  [Status.FAILED]: 'F',
  [Status.PASSED]: '.',
  [Status.PENDING]: 'P',
  [Status.SKIPPED]: '-',
  [Status.UNDEFINED]: 'U',
}

class SimpleFormatter extends SummaryFormatter {
  constructor(options) {
    super(options)
    options.eventBroadcaster
      .on('test-case-started', (data) => this.logTestCaseName(data))
      .on('test-step-finished', (data) => this.logTestStep(data))
      .on('test-case-finished', () => this.logSeparator())
  }

  logTestCaseName({sourceLocation}) {
    const {gherkinDocument, pickle} = this.eventDataCollector.getTestCaseData(sourceLocation)
    this.log(gherkinDocument.feature.name + ' / ' + pickle.name + ": ");
  }
  logTestStep({testCase, index, result}) {
    const { status } = result
    const character = this.colorFns[status](STATUS_CHARACTER_MAPPING[status])
    this.log(character)
  }
  logSeparator() {
    this.log('\n');
  }

}
module.exports = SimpleFormatter
