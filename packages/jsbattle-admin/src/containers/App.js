import React, {Component} from "react";
import TopBar from '../components/TopBar.js';
import Loading from '../components/Loading.js';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
  faExclamationTriangle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Route, Redirect, HashRouter as Router} from 'react-router-dom';
import UserList from "./UserList.js";
import BattleList from "./BattleList.js";
import LoginScreen from "./LoginScreen.js";
import {connect} from 'react-redux';
import {clearError, getUserProfile} from '../actions';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    if(this.props.isLoading) {
      return <div style={{padding: '1em'}}><Loading /></div>;
    }
    const router = <div>
          <Router>
            <div>
              <Route exact path="/">
                <Redirect to="/battles" />
              </Route>
              <Route path="/users" component={UserList} />
              <Route path="/battles" component={BattleList} />
            </div>
          </Router>
        </div>;

    const loginScreen = <LoginScreen />;

    let errors = Object.keys(this.props.errors)
      .filter((key) => this.props.errors[key])
      .map((key) => (
        <Card bg="danger" border="danger" text="light" key={key}>
          <Card.Body>
            <Button variant="link" style={{color: '#fff'}} className="float-right" onClick={() => this.props.clearError(key)}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <FontAwesomeIcon icon={faExclamationTriangle} /> {this.props.errors[key]}
          </Card.Body>
        </Card>
      ));
    let errorsPanel = <Container style={{paddingTop: '2em', paddingBottom: '2em'}}>
      <Row>
        <Col xl={12}>
          {errors}
        </Col>
      </Row>
    </Container>;
    if(errors.length == 0) {
      errorsPanel = null;
    }

    return (
      <div>
        <TopBar username={this.props.profile ? this.props.profile.displayName : null}/>
        {errorsPanel}
        {this.props.profile ? router : loginScreen}
      </div>
    );
  }
}

App.defaultProps = {

};

App.propTypes = {

};


const mapStateToProps = (state) => ({
  profile: state.auth.profile,
  errors: state.error,
  isLoading: state.loading.USER_PROFILE,
});
const mapDispatchToProps = (dispatch) => ({
  clearError: (type) => {
 dispatch(clearError(type));
},
  getUserProfile: () => {
 dispatch(getUserProfile());
}
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
