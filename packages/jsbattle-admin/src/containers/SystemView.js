import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SideMenu from '../components/SideMenu.js';
import Loading from '../components/Loading.js';
import {connect} from 'react-redux';
import {getSystemInfo} from '../actions';
import {
  faServer,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  faCircle
} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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
    let mUnit = m > 1 ? 'minutes' : 'minute';
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

  renderNode(node) {

    let cardClass = 'card';
    let headerClass = "card-header";
    if(node.nodeID.startsWith('gateway')) {
      cardClass += " bg-dark";
      headerClass += " text-white";
    }
    return <Col md={6} key={node.nodeID}>
      <div className={cardClass}>
        <div className={headerClass}>
          <FontAwesomeIcon size="lg" icon={faServer} /> &nbsp; <strong>{node.nodeID}</strong>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Cluster
            <span className="badge badge-dark badge-pill">{node.clusterName}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Host
            <span className="badge badge-dark badge-pill">{node.hostname}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            OS up time
            <span className="badge badge-success badge-pill">{this.formaUptime(node.os.uptime)}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Application up time
            <span className="badge badge-success badge-pill">{this.formaUptime(node.processUptime)}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Application version
            <span className="badge badge-primary badge-pill">v{node.appVersion}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Client
            <span className="badge badge-primary badge-pill">{node.client}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Running services
            <span className="badge badge-primary badge-pill">{node.services.length}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            CPU (15min average)
            <span className="badge badge-primary badge-pill">{node.cpu.load15.toFixed(1)}%</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Memory
            <span className="badge badge-primary badge-pill">{node.memory.percent.toFixed(1)}%</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Server time
            <span className="badge badge-light badge-pill">{node.time.utc}</span>
          </li>
        </ul>
      </div>
    </Col>;
  }

  renderServices(nodes, allServices) {
    if(!allServices || !nodes) return;
    let data = [];
    let header = nodes.map((node) => node.nodeID);
    for(let serviceName of allServices) {
      data.push({
        name: serviceName,
        status: nodes.map((node) => node.services.indexOf(serviceName) != -1)
      });
    }

    function checkbox(value) {
      if(value) {
        return <FontAwesomeIcon size="lg" icon={faCheckCircle} />;
      } else {
        return <FontAwesomeIcon size="lg" icon={faCircle} />;
      }
    }

    let grid = data.map((row) => (
      <tr key={row.name}>
        <th scope="row">{row.name}</th>
        {row.status.map((s, i) => <td key={i} className="text-center">{checkbox(s)}</td>)}
      </tr>
    ));

    return <Col md={12}>
      <table className="table table-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Service</th>
            {header.map((h, i) => <th key={i} scope="col" className="text-center">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {grid}
        </tbody>
      </table>
    </Col>;
  }

  render() {
    if(this.props.isLoading) {
      return<Loading />;
    }
    let nodes = this.props.nodes ? this.props.nodes.map((n) => this.renderNode(n)) : null;
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
              <h1 className="display-5">Nodes</h1>
              <Row>
                {nodes}
              </Row>
              <h1 className="display-5">Services</h1>
              <Row>
                {this.renderServices(this.props.nodes, this.props.allServices)}
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
  nodes: state.system.info.nodes,
  allServices: state.system.info.allServices,
});

const mapDispatchToProps = (dispatch) => ({
  getSystemInfo: () => dispatch(getSystemInfo())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemView);
