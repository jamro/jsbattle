import JsBattleBattlefield from "jsbattle-react";
import JsBattle from "jsbattle-engine";

export default class UbdPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.battlefield = null;
    this.state = {
      result: null,
      view: "form",
      descriptor: null,
      rngSeed: null,
      timeLimit: 0,
      teamMode: false,
      errorMessage: ""
    };
  }

  startBattle() {
    let ubd = this.refs.input.value; // eslint-disable-line react/no-string-refs
    let descriptor = JsBattle.createUBD();
    try{
      descriptor.decode(ubd);
    } catch (err) {
      this.showError(String(err));
      return;
    }
    this.setState({
      view: "loading",
      descriptor: descriptor,
      teamMode: descriptor.getTeamMode(),
      rngSeed: descriptor.getRngSeed(),
      timeLimit: descriptor.getTimeLimit()
    });
  }

  showError(msg) {
    this.setState({
      view: 'error',
      errorMessage: msg
    });
  }

  onBattleFinish(result) {
    let output = {};
    output.tankList = result.tankList.map((tank) => {
      return {
        id: tank.id,
        name: tank.name,
        team: tank.team.name,
        fullName: tank.fullName,
        skin: tank.skin,
        score: Math.round(tank.score*100)/100
      };
    });
    output.teamList = result.teamList.map((team) => {
      return {
        name: team.name,
        size: team.size,
        score: Math.round(team.score*100)/100
      };
    });
    output.winner = {
      tank: result.tankWinner.id,
      team: result.teamWinner.name
    };
    output.timeLeft = result.timeLeft;
    output.teamMode = this.state.teamMode;

    this.setState({
      view: "result",
      result: JSON.stringify(output, null, 2)
    });
  }

  getBattlefield(seed, timeLimit) {
    if(seed === undefined || seed === null) return null;
    console.log(this.state.descriptor.getAiList());
    return <JsBattleBattlefield
      ref={(battlefield) => this.battlefield = battlefield }
      aiDefList={this.state.descriptor.getAiList()}
      rngSeed={seed}
      timeLimit={timeLimit}
      teamMode={this.state.teamMode}
      width={100}
      height={100}
      speed={1000000}
      quality={0}
      renderer="void"
      onStart={() => {}}
      onError={(msg) => this.showError(msg)}
      onRender={() => {}}
      onFinish={(result) => this.onBattleFinish(result)}
    />;
  }

  render() {
    let views = [];
    let ubdSample ='{"version":3, "timeLimit":0, "rngSeed":0.13398684952602968,"teamMode":false,"aiList":[{"name":"jamro","team":"1qdhdbot4","code":null,"initData":null,"useSandbox":true,"executionLimit":100},{"name":"jamro","team":"1qdh9wa9n","code":null,"initData":null,"useSandbox":true,"executionLimit":100}]}';
    let txt = <p><textarea id="ubdInput" ref="input" style={{width: "100%", height: "300px"}} >{ubdSample}</textarea></p>; // eslint-disable-line react/no-string-refs
    views.form = <div>
      <p>Paste content of *.UBD file and click Play</p>
      {txt}
      <p><button id="playButton" onClick={() => this.startBattle()}>Play</button></p>
    </div>;

    views.result = <div>
      <pre id="result" style={{border: "1px solid black", padding: "10px"}}>{this.state.result}</pre>
    </div>;

    views.loading = <div>
      <pre id="loading" style={{border: "1px solid black", padding: "10px"}}>Battle in progress...</pre>
    </div>;

    views.error = <div>
      <pre id="error" style={{border: "1px solid black", padding: "10px", backgroundColor: 'red', color: 'white'}}>
        {this.state.errorMessage}
      </pre>
    </div>;

    return <div>
      <h1>UBD Player</h1>
      {views[this.state.view]}
      {this.getBattlefield(this.state.rngSeed, this.state.timeLimt)}
    </div>;
  }

}
