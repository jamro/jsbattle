import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SideMenu from '../components/SideMenu.js';
import Loading from '../components/Loading.js';
import {connect} from 'react-redux';
import {getUserDetails} from '../actions';
import {
  faUser,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class UserView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserDetails(this.props.match.params.id);
  }

  render() {
    if(this.props.isLoading) {
      return<Loading />;
    }
    if(!this.props.user) {
      return <span>User not found</span>;
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
                <Breadcrumb.Item href="#/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="#/users">Users</Breadcrumb.Item>
                <Breadcrumb.Item  active>{this.props.user.account.displayName} ({this.props.user.account.username})</Breadcrumb.Item>
              </Breadcrumb>
                <div className="card">
                  <div className="card-header">
                    <FontAwesomeIcon size="lg" icon={faUser} /> &nbsp; <strong>Account</strong>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      User name <span className="badge bg-primary badge-pill">{this.props.user.account.username}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Display name <span className="badge bg-primary badge-pill">{this.props.user.account.displayName}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Provider <span className="badge bg-primary badge-pill">{this.props.user.account.provider}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Email <span className="badge bg-primary badge-pill">{this.props.user.account.email}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Status <span className="badge bg-primary badge-pill">{this.props.user.account.registered ? 'Registered' : 'Unregistered'}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Role <span className="badge bg-primary badge-pill">{this.props.user.account.role}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Joined at <span className="badge bg-primary badge-pill">{new Date(this.props.user.account.createdAt).toLocaleString()}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Last login <span className="badge bg-primary badge-pill">{new Date(this.props.user.account.lastLoginAt).toLocaleString()}</span>
                    </li>
                  </ul>
                </div>
                <hr />
                <div className="card">
                  <div className="card-header">
                    <FontAwesomeIcon size="lg" icon={faChartBar} /> &nbsp; <strong>Stats</strong>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Challenges Completed <span className="badge bg-primary badge-pill">{this.props.user.challenges.length}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Scripts stored <span className="badge bg-primary badge-pill">{this.props.user.scripts.length}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Battles stored <span className="badge bg-primary badge-pill">{this.props.user.battles.length}</span>
                    </li>
                  </ul>
                </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({
  user: state.users.selected,
  isLoading: state.loading.USER_VIEW
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetails: (id) => dispatch(getUserDetails(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);
