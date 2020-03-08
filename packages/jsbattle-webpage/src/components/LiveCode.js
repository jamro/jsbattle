import React from "react";
import JsBattle from "jsbattle-engine";
import Row from './Row.js';
import Loading from './Loading.js';
import Col from './Col.js';
import InfoBox from './InfoBox.js';
import LiveCodeInfoTab from './LiveCodeInfoTab.js';
import LiveCodeCodeTab from './LiveCodeCodeTab.js';
import LiveCodeCheatSheetTab from './LiveCodeCheatSheetTab.js';
import LiveCodeDebugTab from './LiveCodeDebugTab.js';
import JsBattleBattlefield from "jsbattle-react";
import PropTypes from 'prop-types';

class LiveCode extends React.Component {

  constructor(props) {
    super(props);

    this.battlefield = null;
    this.reloadTimeout = null;
    this.reloadCallback = null;

    let aiDefList = (props.code && props.aiDefList.length >= 1) ? this.createAiDefList(props.aiDefList, props.code, props.count) : [];

    this.state = {
      aiDefList: aiDefList,
      tab: props.info ? 'info' : 'code',
      isFinished: false,
      loading: true,
      debug: {}
    };

    this.modifier = (simulation) => {
      if(!this.props.modifier) return;
      simulation.tankList.forEach((tank) => {
        let tankName = tank.name.toLowerCase();
        let data = this.props.modifier[tankName];
        if(!data) return;
        data = data[Math.floor(Math.random()*data.length)];
        tank.moveTo(
            (simulation.battlefield.minX + simulation.battlefield.maxX)/2 + data.x,
            (simulation.battlefield.minY + simulation.battlefield.maxY)/2 + data.y,
            data.a
          );
      });
    };
  }

  componentDidUpdate(prevProps) {
    let oldAiDefList = JSON.stringify(prevProps.aiDefList.map((ai) => ai.toJSON()));
    let newAiDefList = JSON.stringify(this.props.aiDefList.map((ai) => ai.toJSON()));

    if(this.props.code != prevProps.code || oldAiDefList != newAiDefList) {
      console.log("Refreshing aiDefList");
      this.setState((state, props) => ({
        aiDefList: this.createAiDefList(props.aiDefList, props.code, props.count)
      }));
    }
  }

  createAiDefList(template, code, count) {
    if(!this.props.name || !code) {
      return [];
    }
    let aiList = [];
    for(let i = 0; i < count; i++) {
      let ai = JsBattle.createAiDefinition();
      try {
        ai.fromCode(this.props.name, code);
      } catch(err) {
        console.error('Unable to create AI "' + this.props.name + '" from code', code);
        console.error(err);
      }
      aiList.push(ai);
    }
    return template.concat(aiList);
  }

  onCodeChanged(code) {
    if(this.reloadTimeout) {
      clearTimeout(this.reloadTimeout);
    }
    this.reloadCallback = () => {
      this.props.onCodeChanged(code);
      this.setState({isFinished: false});
    };
    this.reloadTimeout = setTimeout(() => {
      if(this.reloadCallback) {
        this.reloadCallback();
        this.reloadCallback = null;
      }
    }, 700);
  }

  updateDebug(sim) {
    let result = sim.tankList.filter((t) => t.name == this.props.name);
    if(result.length < 1) {
      this.setState({debug: {}});
      return;
    }
    this.setState({debug: result[0].debugData});
  }

  handleBattleFinish(result) {
    console.log("battle finished");
    this.setState({isFinished: true});
    this.props.onFinish(result);
  }

  handleBattleError(error) {
    console.log("battle error: " + error);
    this.setState({error, loading: false});
  }

  handleBattleInit() {
    console.log("battle initialized");
    this.setState({error: null, loading: true});
  }

  handleBattleStart() {
    console.log("battle started");
    this.setState({loading: false});
  }

  restartBattle() {
    if(this.reloadTimeout) {
      clearTimeout(this.reloadTimeout);
    }
    if(this.reloadCallback) {
      this.reloadCallback();
      this.reloadCallback = null;
    }
    this.setState({isFinished: false});
    if(this.battlefield) {
      console.log("Restarting the battle");
      this.battlefield.restart();
    } else {
      console.log("cannot restart battle. it does not exists");
    }
  }

  renderTabLink(id, icon, label) {
    return <li key={id} className={`nav-item tab-link-${id}`}>
      <span className={'nav-link clickable ' + (this.state.tab == id ? 'active' : '')} onClick={() => this.setState({tab: id})}>
        <i className={icon}></i> {label}
      </span>
    </li>;
  }

  render() {
    if(this.props.isLoading) {
      return <Loading />;
    }
    let winBox = null;
    if(this.state.isFinished) {
      winBox = <div className="battle-overlay">
          {this.props.children}
        </div>;
    }
    let errBox = null;
    if(this.state.error) {
      errBox = <div className="battle-overlay">
          <InfoBox message={this.state.error} level="danger"/>
        </div>;
    }

    let loadingBox = null;
    if(this.state.loading) {
      loadingBox = <div className="battle-overlay">
          <Loading />
        </div>;
    }
    let tabLinks = [];
    if(this.props.info) {
      tabLinks.push(this.renderTabLink('info', "fa fa-info-circle", "Info"));
    }
    tabLinks.push(this.renderTabLink('code', "fa fa-code", "Code"));
    tabLinks.push(this.renderTabLink('debug', "fa fa-bug", "Debug"));
    tabLinks.push(this.renderTabLink('cheatsheet', "fa fa-life-ring", "Cheat Sheet"));

    tabLinks = tabLinks.concat(this.props.extraTabs.map((tab) => (
      this.renderTabLink(tab.id, tab.icon, tab.label)
    )));

    let tabs = {
      info: <LiveCodeInfoTab
          info={this.props.info}
          onSkip={() => this.setState({tab: 'code'})}
        />,
      code: <LiveCodeCodeTab
          defaultValue={this.props.code}
          onChange={(code) => this.onCodeChanged(code)}
        />,
      debug: <LiveCodeDebugTab
          data={this.state.debug}
          highlight={true}
        />,
      cheatsheet: <LiveCodeCheatSheetTab />
    };
    this.props.extraTabs.forEach((tab) => {
      tabs[tab.id] = tab.content;
    });


    let tabContent = tabs[this.state.tab];
    let battlefield = null;
    if(this.state.aiDefList.length) {
      battlefield = <JsBattleBattlefield
        ref={(b) => this.battlefield = b }
        debug={false}
        autoResize={true}
        aiDefList={this.state.aiDefList}
        rngSeed={this.props.rngSeed}
        timeLimit={this.props.timeLimit}
        teamMode={this.props.teamMode}
        speed={this.props.simSpeed}
        quality={this.props.simQuality}
        renderer="brody"
        modifier={this.modifier}
        onRender={(sim) => this.updateDebug(sim)}
        onFinish={(result) => this.handleBattleFinish(result)}
        onError={(error) => this.handleBattleError(error)}
        onInit={() => this.handleBattleInit()}
        onStart={() => this.handleBattleStart()}
      />;
    }

    return <div className="live-code">
      <Row>
        <Col md={6}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#"><i className="fa fa-search"></i> Battle Preview</a>
            </li>
          </ul>
          {errBox}
          {loadingBox}
          {winBox}
          {battlefield}
        </Col>
        <Col md={6}>
          <ul className="nav nav-tabs live-code-right-tabs">
            {tabLinks}
          </ul>
          {tabContent}
        </Col>
      </Row>
    </div>;
  }
}

LiveCode.defaultProps = {
  list: [],
  extraTabs: [],
  simQuality: 'auto',
  name: 'player',
  count: 1,
  code: '',
  info: '',
  rngSeed: Math.random(),
  timeLimit: 0,
  teamMode: false,
  modifier: {},
  simSpeed: 1,
  isLoading: false,
  aiDefList: [],
  onFinish: () => {},
  onCodeChanged: () => {}
};

LiveCode.propTypes = {
  list: PropTypes.array,
  extraTabs: PropTypes.array,
  name: PropTypes.string,
  count: PropTypes.number,
  code: PropTypes.string,
  info: PropTypes.string,
  timeLimit: PropTypes.number,
  teamMode: PropTypes.bool,
  modifier: PropTypes.object,
  aiDefList: PropTypes.array,
  onFinish: PropTypes.func,
  onCodeChanged: PropTypes.func
};

export default LiveCode;
