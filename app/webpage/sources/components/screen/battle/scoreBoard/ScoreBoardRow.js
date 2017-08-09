module.exports = class ScoreBoardRow extends React.Component {

  render() {
    var progressStyle = {
      width: Math.round(this.props.energy) + "%"
    };
    return <tr>
      <td>{this.props.name}</td>
      <td className="text-center">
        <div className="progress" style={{marginBottom: 0}}>
          <div className="progress-bar" role="progressbar" aria-valuenow="{Math.round(this.props.energy)}" aria-valuemin="0" aria-valuemax="100" style={progressStyle}>
            {this.props.energy.toFixed(2)}
          </div>
        </div>
      </td>
      <td className="text-right">{this.props.score.toFixed(2)}</td>
    </tr>;
  }
};
