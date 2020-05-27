import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SideMenu from '../components/SideMenu.js';
import SmartTable from '../components/SmartTable.js';
import Loading from '../components/Loading.js';
import {connect} from 'react-redux';
import {getBattleList} from '../actions';

function vsFormatter(value) {
  let parts = new RegExp(/(.+)\/(.+) vs (.+)\/(.+)/).exec(value);

  return <span style={{color: "#333"}}><strong style={{color: "#000"}}>{parts[1]}</strong>/{parts[2]} <span style={{color: "#888"}}>vs</span> <strong style={{color: "#000"}}>{parts[3]}</strong>/{parts[4]}</span>;
}

class BattleList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getBattleList();
  }

  render() {
    if(this.props.isLoading) {
      return<Loading />;
    }
    return (
      <div>
        <Container fluid="xl">
          <Row>
            <Col lg={3} xl={2} style={{backgroundColor: '#f7f7f7', borderRight: '1px solid #ececec'}} >
              <SideMenu />
            </Col>
            <Col lg={9} xl={10} style={{paddingTop: '1em'}}>
              <Breadcrumb>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Battles</Breadcrumb.Item>
              </Breadcrumb>
              <SmartTable
                columns={[
                  {
                    name: 'ID',
                    field: 'id',
                    format: [
                      (value) => {
                        let baseUrl = window.location.href.replace(/(.*)#.*/, '$1').replace(/(.*)(admin\/?)/, '$1');
                        return `${baseUrl}#replay=${value}`;
                      },
                      'urlLink'
                    ]
                  },
                  {name: 'Description', field: 'description', format: vsFormatter},
                  {name: 'Create Date', field: 'createdAt', format: 'date'},
                  {name: 'Expire Date', field: 'expiresAt', format: 'date'}
                ]}
                data={this.props.battlePage}
                onPageRequest={(page) => this.props.getBattleList(page)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  battlePage: state.battles.page,
  isLoading: state.loading.BATTLE_LIST
});

const mapDispatchToProps = (dispatch) => ({
  getBattleList: (page, pageSize) => dispatch(getBattleList(page, pageSize))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleList);
