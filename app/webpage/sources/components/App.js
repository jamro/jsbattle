import Navi from "./common/navi/Navi.js";
import AiRepository from "../lib/AiRepository.js";
import TestRoomPage from "./TestRoomPage.js";
import EditorPage from "./EditorPage.js";
import FullRow from "./common/bootstrap/FullRow.js";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    let simSpeed;
    let qualitySettings;
    if(!props.stateless) {
      simSpeed = localStorage.getItem("settings.simSpeed");
      qualitySettings = localStorage.getItem("settings.quality");
    }
    simSpeed = simSpeed ? simSpeed : 1;
    qualitySettings = qualitySettings ? qualitySettings : "auto";
    this.state = {
      simSpeed: simSpeed,
      qualitySettings: qualitySettings,
      page: "testroom",
      pageData: {}
    };
    this.aiRepository = new AiRepository(props.stateless);
    this.hasUnsavedCode = false;
  }

  setSimulationSpeed(v) {
    this.setState({simSpeed: v});
    localStorage.setItem("settings.simSpeed", v);
  }

  setSimulationQuality(v) {
    this.setState({qualitySettings: v});
    localStorage.setItem("settings.quality", v);
  }

  onUnsavedCode(hasUnsaved) {
    this.hasUnsavedCode = hasUnsaved;
  }

  openPage(name, data) {
    if(this.state.page == 'editor' && this.hasUnsavedCode) {
      if(confirm('Changes that you made may not be saved. Are you sure?')) {
        this.setState({
          page: name,
          pageData: data
        });
      }
    } else {
      this.setState({
        page: name,
        pageData: data
      });
    }
  }

  renderContent() {
    switch(this.state.page) {
      case 'testroom':
        return <TestRoomPage
          renderer={this.props.renderer}
          stateless={this.props.stateless}
          speed={this.state.simSpeed}
          quality={this.state.qualitySettings}
          aiRepository={this.aiRepository}
          openPage={(name, data) => this.openPage(name, data)}
          quickBattleTank={this.state.pageData ? this.state.pageData.quickBattleTank : null}
        />;
      case 'editor':
        this.hasUnsavedCode = false;
        return <EditorPage
          stateless={this.props.stateless}
          aiRepository={this.aiRepository}
          back={this.state.pageData ? this.state.pageData.back : null}
          tankName={this.state.pageData ? this.state.pageData.tankName : null}
          openPage={(name, data) => this.openPage(name, data)}
          onUnsavedCode={(hasUnsaved) => this.onUnsavedCode(hasUnsaved)}
        />;
      default:
        return <FullRow>Oops! Page not found :/</FullRow>;
    }
  }

  render() {
    return <div>
      <Navi
        speed={this.state.simSpeed}
        quality={this.state.qualitySettings}
        onSpeedChange={(v) => this.setSimulationSpeed(v)}
        onQualityChange={(v) => this.setSimulationQuality(v)}
        page={this.state.page}
        openPage={(name, data) => this.openPage(name, data)}
      />
      {this.renderContent()}
      <FullRow>
        <small style={{color: '#999', textAlign: 'center', borderTop: '1px solid #999', width: "100%", display: 'inline-block', padding: '5px'}}>
          Hosted on <a href="https://github.com/jamro/jsbattle" target="_blank"><i className="fa fa-github-alt" aria-hidden="true"></i> GitHub</a>.
          This project is licensed under the terms of the <a href="https://opensource.org/licenses/MIT" target="_blank">MIT license</a>.
          Version: %%GULP_INJECT_VERSION%%.
        </small>
      </FullRow>
    </div>;
  }
}
