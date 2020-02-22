import Row from "../components/Row.js";
import Col from "../components/Col.js";
import Loading from "../components/Loading.js";
import React from "react";
import {connect} from 'react-redux';
import {registerProfile} from '../actions/coreAction.js';

class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);
    this.usernameInput = React.createRef();
    this.displayNameInput = React.createRef();
  }

  submitForm() {
    const username = this.usernameInput.current.value;
    const displayName = this.displayNameInput.current.value;
    this.props.registerProfile(username, displayName);
  }

  render() {
    let saveProfileLabel;
    if(this.props.isLoading) {
      saveProfileLabel = <Loading />;
    } else {
      saveProfileLabel = <span>Save profile  <i className="fas fa-user-check"></i></span>;
    }
    return <Row>
        <Col lg={4} md={3} sm={2} xs={1}></Col>
        <Col lg={4} md={6} sm={8} xs={10}>
          <h1>Create Account</h1>
          <form id="register-form">
            <div className="form-group">
              <label htmlFor="username"><i className="fas fa-user"></i> User Name</label>
              <input disabled={this.props.isLoading} type="text" ref={this.usernameInput} className="form-control form-control-lg" id="username" defaultValue={this.props.username} />
            </div>
            <div className="form-group">
              <label htmlFor="displayname"><i className="fas fa-user-tag"></i> Display Name</label>
              <input  disabled={this.props.isLoading} type="text" ref={this.displayNameInput} className="form-control form-control-lg" id="displayname" defaultValue={this.props.displayName} />
            </div>
            <button disabled={this.props.isLoading} className="btn btn-lg btn-primary float-right" onClick={() => this.submitForm()}>
              {saveProfileLabel}
            </button>
          </form>
        </Col>
        <Col lg={4} md={3} sm={2} xs={1}></Col>
      </Row>;
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.profile.username || '',
  displayName: state.auth.profile.displayName || '',
  isLoading: state.loading.PROFILE_REGISTER,
});

const mapDispatchToProps = (dispatch) => ({
  registerProfile: (username, displayName) => {
    dispatch(registerProfile(username, displayName));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
