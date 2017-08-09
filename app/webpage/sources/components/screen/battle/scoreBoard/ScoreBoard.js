var ScoreBoardRow = require('./ScoreBoardRow.js');
var UnfreshComponent = require('../../../common/UnfreshComponent.js');

module.exports = class ScoreBoard extends UnfreshComponent {

  renderRows() {
    return this.props.tankList.map((tank) => {
      return <ScoreBoardRow
      key={tank.rank}
      name={tank.name}
      energy={tank.energy}
      score={tank.score}
      />;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.tankList && this.props.tankList && nextProps.tankList.length != this.props.tankList.length) {
      return true;
    }
    return super.shouldComponentUpdate(nextProps, nextState);
  }

  render() {
    return <table className="table table-condensed">
      <thead>
        <tr>
          <th>Tank Name</th>
          <th className="text-center">Energy</th>
          <th className="text-right">Score</th>
        </tr>
      </thead>
      <tbody>
        {this.renderRows()}
      </tbody>
    </table>;
  }
};
