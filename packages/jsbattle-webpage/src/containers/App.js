import React, {Component} from "react";
import {Route, Redirect, HashRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import ChallengeListScreen from './ChallengeListScreen.js';
import ChallengeScreen from './ChallengeScreen.js';
import ScriptListScreen from './ScriptListScreen.js';
import SandboxScreen from './SandboxScreen.js';
import LeagueScreen from './LeagueScreen.js';
import SignInScreen from './SignInScreen.js';
import RegisterScreen from './RegisterScreen.js';
import Navi from './Navi.js';
import Footer from './Footer.js';
import ErrorPanel from './ErrorPanel.js';
import Loading from '../components/Loading.js';
import {getSettings, getUserProfile} from '../actions/coreAction.js';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSettings();
    this.props.getUserProfile();
  }

  render() {
    if(this.props.isLoading) {
      return <Loading />;
    }
    if(this.props.requestRegister) {
      return <div>
            <Router>
              <div>
                <Route path="/" component={Navi} />
                <Route path="/" component={ErrorPanel} />
                <Route path="/" component={RegisterScreen} />
                <Route path="/" component={Footer} />
              </div>
            </Router>
          </div>;
    }

    let signInRoute = null;
    if(!this.props.profile || !this.props.profile.role || this.props.profile.role == 'guest') {
      signInRoute = <Route exact path="/signin" component={SignInScreen} />;
    } else {
      signInRoute = <Route path="/signin"><Redirect to="/challenge" /></Route>;
    }

    return <div>
          <Router>
            <div>
              <Route exact path="/">
                <Redirect to="/signin" />
              </Route>
              <Route path="/" component={Navi} />
              <Route path="/" component={ErrorPanel} />
              <Route exact path="/challenge/:id" component={ChallengeScreen} />
              <Route exact path="/challenge" component={ChallengeListScreen} />
              <Route exact path="/sandbox/:name" component={SandboxScreen} />
              <Route exact path="/sandbox" component={ScriptListScreen} />
              <Route exact path="/league" component={LeagueScreen} />
              {signInRoute}
              <Route path="/" component={Footer} />
            </div>
          </Router>
        </div>;
  }
}

App.defaultProps = {

};

App.propTypes = {

};

const mapStateToProps = (state) => ({
  requestRegister: (!state.auth.profile.registered && state.auth.profile.role && state.auth.profile.role != 'guest'),
  isLoading: !state.settings.loaded || state.loading.SETTINGS || state.loading.USER_PROFILE,
  profile: state.auth.profile
});
const mapDispatchToProps = (dispatch) => ({
  getSettings: () => {
    dispatch(getSettings());
  },
  getUserProfile: () => {
    dispatch(getUserProfile());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
