import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SideMenu from '../components/SideMenu.js';
import SmartTable from '../components/SmartTable.js';
import Loading from '../components/Loading.js';
import {connect} from 'react-redux';
import {getScriptList} from '../actions';


class ScriptList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getScriptList();
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
                <Breadcrumb.Item active>Scripts</Breadcrumb.Item>
              </Breadcrumb>
              <SmartTable
                columns={[
                  {name: 'Owner', field: 'ownerName'},
                  {name: 'Script', field: 'scriptName'},
                  {name: 'Create Date', field: 'createdAt', format: 'datetime'},
                  {name: 'Modify Date', field: 'createdAt', format: 'datetime'},
                ]}
                data={this.props.page}
                onPageRequest={(page) => this.props.getScriptList(page)}

              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.scripts.page,
  isLoading: state.loading.SCRIPT_LIST
});

const mapDispatchToProps = (dispatch) => ({
  getScriptList: (page, pageSize) => dispatch(getScriptList(page, pageSize))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptList);
