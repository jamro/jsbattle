import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SideMenu from '../components/SideMenu.js';
import SmartTable from '../components/SmartTable.js';
import Loading from '../components/Loading.js';
import {connect} from 'react-redux';
import {getSessionList} from '../actions';

function userFormatter(value, row) {
  console.log(row);
  let baseUrl = window.location.href.replace(/(.*)#.*/, '$1');
  let url = `${baseUrl}#/users/${row.userId}`;
  return <a href={url}>{value}</a>;
}

class SessionList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSessionList();
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
                <Breadcrumb.Item href="#/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Sessions</Breadcrumb.Item>
              </Breadcrumb>
              <SmartTable
                columns={[
                  {name: 'User', field: 'username', format: userFormatter},
                  {name: 'Role', field: 'role', format: (v) => v == 'admin' ? <span className="badge bg-danger">{v}</span> : <span className="badge bg-info">{v}</span>},
                  {name: 'Last Activity', field: 'lastAction', format: [
                    (value) => new Date().getTime() - new Date(value.timestamp).getTime(),
                    'duration',
                    (value) => value ? value + " ago" : "now"
                  ]},
                  {name: 'Service', field: 'lastAction', format: (value) => value.service.split('.').shift()},
                  {name: 'Action', field: 'lastAction', format: (value) => value.service.split('.').pop()},
                  {name: 'URI', field: 'lastAction', format: (value) => value.uri.substring(0, 64)},
                ]}
                data={this.props.page}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.sessions.page,
  isLoading: state.loading.SESSION_LIST
});

const mapDispatchToProps = (dispatch) => ({
  getSessionList: (page, pageSize) => dispatch(getSessionList(page, pageSize))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionList);
