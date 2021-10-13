import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SideMenu from '../components/SideMenu.js';
import Loading from '../components/Loading.js';
import {connect} from 'react-redux';
import {getDashboardInfo} from '../actions';
import {
  faUsers,
  faUserCog,
  faUserCheck,
  faUserClock,
  faScroll,
  faTrophy,
  faFistRaised,
  faSignInAlt,
  faDatabase,
  faServer,
  faFlask
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getDashboardInfo();
  }

  renderTile(title, icon, value, bg) {
    bg = bg || 'light';
    const textMap = {
      primary: 'light',
      secondary: 'light',
      success: 'light',
      danger: 'light',
      info: 'light',
      warning: 'dark',
      light: 'light',
      dark: 'white',
    };
    let text = textMap[bg];
    if(!isNaN(Number(value))) {
      value = value.toLocaleString();
    }
    return <div className="col" style={{paddingBottom: '1em'}}>
      <div className={"card bg-" + bg + " text-" + text}>
        <div className="card-body text-center">
          <h6 className="card-title">{title}</h6>
          <p className="card-text"><FontAwesomeIcon size="2x" icon={icon} /></p>
          <h5><span className={"badge badge-pill bg-" + text + " text-" + bg}>{value}</span></h5>
        </div>
      </div>
    </div>;
  }

  render() {
    if(this.props.isLoading) {
      return<Loading />;
    }
    let scriptsPerUser = this.props.dashboard.users.registered ? this.props.dashboard.scriptCount/this.props.dashboard.users.registered : 0;
    return (
      <div>
        <Container fluid>
          <Row>
            <Col lg={3} xl={2} style={{backgroundColor: '#f7f7f7', borderRight: '1px solid #ececec'}} >
              <SideMenu />
            </Col>
            <Col lg={9} xl={10} style={{paddingTop: '1em'}}>
              <Breadcrumb>
                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {this.renderTile("All Users", faUsers, this.props.dashboard.users.all, 'success')}
                {this.renderTile("Registered Users", faUserCheck, this.props.dashboard.users.registered, 'success')}
                {this.renderTile("Active Users", faUserCog, this.props.dashboard.users.active, 'success')}
                {this.renderTile("Online Users", faUserClock, this.props.dashboard.users.online, 'success')}
                {this.renderTile("League Size", faTrophy, this.props.dashboard.league.size, 'danger')}
                {this.renderTile("League entries / day", faSignInAlt, this.props.dashboard.league.entriesPerDay, 'danger')}
                {this.renderTile("Battles / hour", faFistRaised, this.props.dashboard.league.battlesPerHour, 'danger')}
                {this.renderTile("Battles Stored", faDatabase, this.props.dashboard.league.battlesStored, 'danger')}
                {this.renderTile("All Scripts", faScroll, this.props.dashboard.scriptCount, 'primary')}
                {this.renderTile("Scripts / User", faScroll, scriptsPerUser.toFixed(1), 'primary')}
                {this.renderTile("System Nodes", faServer, this.props.dashboard.nodes, 'info')}
                {this.renderTile("Challenge #1", faFlask, this.props.dashboard.challenges['challenge-8UCUaNvC'], 'warning')}
                {this.renderTile("Challenge #2", faFlask, this.props.dashboard.challenges['challenge-Du7tyrCB'], 'warning')}
                {this.renderTile("Challenge #3", faFlask, this.props.dashboard.challenges['challenge-4syTf6ph'], 'warning')}
                {this.renderTile("Challenge #4", faFlask, this.props.dashboard.challenges['challenge-hXMwLdZw'], 'warning')}
                {this.renderTile("Challenge #5", faFlask, this.props.dashboard.challenges['challenge-tV3fKHBw'], 'warning')}
                {this.renderTile("Challenge #6", faFlask, this.props.dashboard.challenges['challenge-6iZxC1FP'], 'warning')}
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
  isLoading: state.loading.DASHBOARD_INFO,
  dashboard: state.dashboard
});

const mapDispatchToProps = (dispatch) => ({
  getDashboardInfo: () => dispatch(getDashboardInfo())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
