import React from 'react';
import JsBattleBattlefield from './JsBattleBattlefield.js';
import JsBattle from 'jsbattle-engine';

class App extends React.Component {

  constructor(props) {
    super(props);

    let player1 = JsBattle.createAiDefinition();
    let player2 = JsBattle.createAiDefinition();
    player1.fromFile('jamro');
    player2.fromFile('jamro');

    this.jsbattle = React.createRef();

    this.state = {
      aiDefList: [player1, player2],
      speed: "1.0",
      renderer: "brody",
      quality: "auto",
      timeLimit: 30000,
      rngSeed: 123456,
      isMounted: true,
      log: []
    };
  }

  addLog(msg) {
    msg = new Date().toLocaleTimeString() + " | " + msg;
    this.setState((state) => ({
      log: [msg].concat(state.log)
    }));
  }

  setTankCount(amount) {
    let aiDefList = [];
    for(let i=0; i < amount; i++) {
      let ai = JsBattle.createAiDefinition();
      ai.fromFile('jamro');
      aiDefList.push(ai);
    }
    this.setState({aiDefList});
  }

  randomize() {
    this.setState({
      rngSeed: Math.round(Math.random()*1000000)
    });
  }

  toggleMount() {
    this.setState((state) => ({
      isMounted: !state.isMounted
    }));
  }

  restartBattle() {
    if(!this.jsbattle.current) {
      return alert('Error: Not mounted!');
    }
    this.jsbattle.current.restart();
  }

  stopBattle() {
    if(!this.jsbattle.current) {
      return alert('Error: Not mounted!');
    }
    this.jsbattle.current.stop();
  }

  onFinish(result) {
    this.addLog("EVENT: onFinish()");
    alert('BATTLE COMPLETED! Winner: ' + result.tankWinner.fullName);
  }

  onError(msg) {
    this.addLog("EVENT: onError()");
    console.error(msg);
    alert(msg);
  }

  render() {
    let boxStyle = {
      display: 'inline-block',
      verticalAlign: 'top',
      margin: '5px'
    };
    let fullBoxStyle = {...boxStyle, width: '450px'};
    let halfBoxStyle = {...boxStyle, width: '225px'};

    let battlefield = null;
    if(this.state.isMounted) {
      battlefield = <JsBattleBattlefield
        ref={this.jsbattle}
        debug={true}
        autoResize={true}
        rngSeed={this.state.rngSeed}
        speed={Number(this.state.speed)}
        quality={Number(this.state.quality)}
        timeLimit={Number(this.state.timeLimit)}
        aiDefList={this.state.aiDefList}
        renderer={this.state.renderer}
        onInit={() => this.addLog("EVENT: onInit()")}
        onReady={() => this.addLog("EVENT: onReady()")}
        onStart={() => this.addLog("EVENT: onStart()")}
        onFinish={(result) => this.onFinish(result)}
        onError={(msg) => this.onError(msg)}
      />;
    }

    return <div>
      <div style={fullBoxStyle}>
        {battlefield}
      </div>
      <div style={halfBoxStyle}>
        <h4>Component Properties</h4>
        <div style={{paddingLeft: '20px'}}>
          <p>
            <label htmlFor="speed">Speed: </label>
            <select id="speed" value={this.state.speed} onChange={(e) => this.setState({speed: e.target.value})}>
              <option value="0.05">Super Slow</option>
              <option value="0.3">Slow</option>
              <option value="1.0">Normal</option>
              <option value="2.0">Fast</option>
              <option value="50.0">Super Fast</option>
            </select>
          </p>
          <p>
            <label htmlFor="quality">Quality: </label>
            <select id="quality" value={this.state.quality} onChange={(e) => this.setState({quality: e.target.value})}>
              <option value="auto">Auto</option>
              <option value="0.0">Low</option>
              <option value="0.5">Medium</option>
              <option value="1.0">High</option>
            </select>
          </p>
          <p>
            <label htmlFor="renderer">Renderer: </label>
            <select id="renderer" value={this.state.renderer} onChange={(e) => this.setState({renderer: e.target.value})}>
              <option>brody</option>
              <option>debug</option>
              <option>bw</option>
            </select>
          </p>
          <p>
            <label htmlFor="tankCount">Tank Count: </label>
            <select id="tankCount" onChange={(e) => this.setTankCount(e.target.value)}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>6</option>
              <option>8</option>
              <option>10</option>
            </select>
          </p>
          <p>
            <label htmlFor="timeLimit">Time Limit: </label>
            <select id="timeLimit" value={this.state.timeLimit} onChange={(e) => this.setState({timeLimit: e.target.value})}>
              <option value="0">none</option>
              <option value="10000">10s</option>
              <option value="20000">20s</option>
              <option value="30000">30s</option>
              <option value="60000">60s</option>
            </select>
          </p>
          <p>
            RNG Seed: <small>{this.state.rngSeed}</small>
          </p>
        </div>
      </div>
      <div style={halfBoxStyle}>
        <h4>Controls</h4>
        <button onClick={() => this.stopBattle()}>Stop</button>
        <button onClick={() => this.restartBattle()}>Restart</button>
        <button onClick={() => this.randomize()}>Randomize</button>
        <button onClick={() => this.toggleMount()}>{this.state.isMounted ? 'Unmount' : 'Mount'}</button>
        <h4>Event Log</h4>
        <pre style={{border: '1px solid #000', fontSize: '0.7em', maxHeight: '21em', overflow: 'hidden'}}>{this.state.log.join('\n')}</pre>
      </div>
    </div>;
  }
}

export default App;
