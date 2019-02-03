import Row from "../bootstrap/Row.js";
import Col from "../bootstrap/Col.js";
import JsonCode from "../JsonCode.js";
import CodeArea from "./CodeArea.js";

export default class CodeEditorWidget extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let settingsData = {
      SKIN: 'forest'
    };
    let infoData = {
      id: 3,
      team: {
        name: 'my-team',
        mates: [1, 2 , 3]
      }
    };
    let controlData = {
      THROTTLE: 0,
      BOOST: 0,
      TURN: 0,
      RADAR_TURN: 0,
      GUN_TURN: 0,
      SHOOT: 0,
      OUTBOX: [],
      DEBUG: {}
    };
    let stateData = {
      x: 39.5,
      y: 74.3,
      angle: 45.2,
      energy: 100,
      boost: 300,
      collisions: {
        enemy: false,
        ally: false,
        wall: false
      },
      radar: {
        angle: 120.4,
        targetingAlarm: false,
        wallDistance: 74,
        enemy: {
          id: 4,
          x: 39.5,
          y: 74.3,
          angle: 45.2,
          speed: 23,
          energy: 43
        },
        ally: {
          id: 4,
          x: 39.5,
          y: 74.3,
          angle: 45.2,
          speed: 23,
          energy: 43
        },
        bullets: [
          {
            id: 4,
            x: 94,
            y: 3,
            angle: -43,
            speed: 45,
            damage: 9
          }
        ]
      },
      gun: {
        angle: -34.5,
        reloading: false
      },
      radio: {
        inbox: []
      }
    };
    return <div>
      <Row>
        <Col lg={3} md={4} className="visible-md visible-lg">
        <div className="card">
          <div className="card-header">
            <strong className="card-title">Cheat Sheet</strong>
          </div>
          <div className="card-body">
            <JsonCode className="debug" highlight={true} data={settingsData} varName="settings"/>
            <JsonCode className="debug" highlight={true} data={infoData} varName="info"/>
            <JsonCode className="debug" highlight={true} data={controlData} varName="control" />
            <JsonCode className="debug" highlight={true} data={stateData} varName="state" />
          </div>
        </div>
        </Col>
        <Col lg={9} md={8} sm={12} xs={12}>
          <CodeArea
            className="form-control"
            defaultValue={this.props.initCode}
            onChange={(code) => this.props.onCodeChanged(code)}
          />
        </Col>
      </Row>
    </div>;
  }
}
