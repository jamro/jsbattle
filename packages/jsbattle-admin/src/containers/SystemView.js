import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SideMenu from '../components/SideMenu.js';
import Loading from '../components/Loading.js';
import SmartTable from '../components/SmartTable.js';
import {connect} from 'react-redux';
import {getSystemInfo} from '../actions';

class SystemView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSystemInfo();
  }

  formaUptime(dt) {
    dt = Math.round(dt);
    let s = dt % 60;
    dt = (dt - s)/60;
    let m = dt % 60;
    dt = (dt - m)/60;
    let h = dt % 24;
    dt = (dt - h)/24;
    let d = dt;

    let dUnit = d > 1 ? 'days' : 'day';
    let hUnit = h > 1 ? 'hours' : 'hour';
    let mUnit = m > 1 ? 'minute' : 'minute';
    let sUnit = 'sec';

    let data = [d, h, m, s];
    let units = [dUnit, hUnit, mUnit, sUnit];
    while(data[0] == 0) {
      data.shift();
      units.shift();
    }
    while(data.length > 2) {
      data.pop();
      units.pop();
    }
    let output = [];
    for(let i=0; i < data.length; i++) {
      output[i] = data[i] + units[i];
    }

    return output.join(' ');
  }

  render() {
    if(this.props.isLoading) {
      return<Loading />;
    }
    return (
      <div>
        <Container fluid>
          <Row>
            <Col lg={3} xl={2} style={{backgroundColor: '#f7f7f7', borderRight: '1px solid #ececec'}} >
              <SideMenu />
            </Col>
            <Col lg={9} xl={10} style={{paddingTop: '1em'}}>
              <Breadcrumb>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>System</Breadcrumb.Item>
              </Breadcrumb>
              <Row>
                <Col md={7}>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      OS up time
                      <span className="badge badge-primary badge-pill">{this.formaUptime(this.props.osUptime)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Application up time
                      <span className="badge badge-primary badge-pill">{this.formaUptime(this.props.appUptime)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Client
                      <span className="badge badge-primary badge-pill">{this.props.client}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Running services
                      <span className="badge badge-primary badge-pill">{this.props.node.upServiceCount}/{this.props.node.totalServiceCount}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      CPU (15min average)
                      <span className="badge badge-primary badge-pill">{this.props.cpu.toFixed(1)}%</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Memory
                      <span className="badge badge-primary badge-pill">{this.props.mem.toFixed(1)}%</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Server time
                      <span className="badge badge-primary badge-pill">{this.props.time}</span>
                    </li>
                  </ul>
                </Col>
                <Col md={5}>
                  <SmartTable
                    columns={[
                      {name: 'Service Name', field: 'name'},
                      {name: 'Running', field: 'up', format: 'check'},
                    ]}
                    data={{rows: this.props.node.services}}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({
  isLoading: state.loading.SYSTEM_INFO,
  node: state.system.info.node,
  cpu: state.system.info.health.cpu.load15,
  mem: state.system.info.health.mem.percent,
  client: state.system.info.health.client.type + " " + state.system.info.health.client.langVersion,
  os: state.system.info.health.os,
  time: state.system.info.health.time.utc,
  osUptime: state.system.info.health.os.uptime,
  appUptime: state.system.info.health.process.uptime,
});

const mapDispatchToProps = (dispatch) => ({
  getSystemInfo: () => dispatch(getSystemInfo())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemView);
