var LoadingScreen = require('./LoadingScreen.js');
var StartScreen = require('./StartScreen.js');
var WinnerScreen = require('./WinnerScreen.js');

module.exports = class Cover extends React.Component {

  constructor(props) {
    super(props);
  }

  renderContent(phase) {
    switch(phase) {
      case 'loading':
        return <LoadingScreen />;
      case 'start':
        return <StartScreen onStart={this.props.onStart}/>;
      case 'winner':
        var msg = this.props.timeLeft == 0 ? "Time out! The winner is:" : "And the winner is...";
        return <WinnerScreen onRestart={this.props.onRestart} message={msg} winner={this.props.winner} />;
      default:
        return null;
    }
  }

  render() {
    var content = this.renderContent(this.props.phase);
    if(!content) return null;
    return <div className="text-center cover">
      <div>
        {content}
      </div>
    </div>;
  }
};
