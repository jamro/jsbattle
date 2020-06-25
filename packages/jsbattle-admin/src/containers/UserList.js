import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SideMenu from '../components/SideMenu.js';
import Loading from '../components/Loading.js';
import SmartTable from '../components/SmartTable.js';
import {connect} from 'react-redux';
import {getUserList} from '../actions';

class UserList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserList();
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
                <Breadcrumb.Item href="/#/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Users</Breadcrumb.Item>
              </Breadcrumb>
              <SmartTable
                columns={[
                  {name: 'User Name', field: 'username'},
                  {name: 'Display Name', field: 'displayName'},
                  {name: 'Auth Provider', field: 'provider'},
                  {
                    name: 'Registered',
                    field: 'registered',
                    style: {textAlign: 'center'},
                    format: 'check'
                  },
                  {
                    name: 'Admin',
                    field: 'role',
                    style: {textAlign: 'center'},
                    format: [
                      (value) => {
                        return value == 'admin' ? 'Y' : '';
                      },
                      'check'
                    ]
                  },
                  {name: 'Register Date', field: 'createdAt', format: 'date'},
                  {name: 'Last Login', field: 'lastLoginAt', format: 'datetime'}
                ]}
                data={this.props.userPage}
                onPageRequest={(page) => this.props.getUserList(page)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({
  userPage: state.users.page,
  isLoading: state.loading.USER_LIST
});

const mapDispatchToProps = (dispatch) => ({
  getUserList: (page, pageSize) => dispatch(getUserList(page, pageSize))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
