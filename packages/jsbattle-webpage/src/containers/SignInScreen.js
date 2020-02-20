import FullRow from "../components/FullRow.js";
import Loading from "../components/Loading.js";
import React from "react";
import {connect} from 'react-redux';
import {getAuthMethods} from '../actions/coreAction.js';

class SignInScreen extends React.Component {

  componentDidMount() {
    this.props.getAuthMethods();
  }

  render() {
    const config = {
      github: {
        icon: 'fab fa-github float-left',
        color: '#fff',
        backgroundColor: '#333'
      },
      facebook: {
        icon: 'fab fa-facebook float-left',
        color: '#fff',
        backgroundColor: '#3b5998'
      },
      google: {
        icon: 'fab fa-google float-left',
        color: '#fff',
        backgroundColor: '#ea4335'
      }
    };

    let buttons = Object.keys(this.props.authMethods).map((providerName) => {
      let auth = this.props.authMethods[providerName];
      const authConfig = config[providerName];
      const style = {
        color: authConfig ? authConfig.color : '#000',
        backgroundColor: authConfig ? authConfig.backgroundColor : '#6cc644',
        border: 0,
        width: '100%',
        maxWidth: '350px',
        margin: '0.2em'
      };
      const icon = authConfig ? authConfig.icon : 'fa fa-lock';
      return <div key={providerName}>
        <a href={auth.url} style={style} className="btn btn-primary btn-lg">
          <i className={icon} style={{marginTop: '0.3em'}}></i> Login with {auth.name}
        </a>
      </div>;
    });

    if(buttons.length == 0) {
      buttons = <em>No authorization method is configured :(</em>;
    }

    if(this.props.isLoading) {
      return <Loading />;
    }
    return <FullRow>
          <div style={{padding: '5em 1em', textAlign: 'center'}}>
            <img src="./img/tank_login.png" alt="JsBattle" />
            <h1>Please sign in</h1>
            {buttons}
          </div>
      </FullRow>;
  }
}

const mapStateToProps = (state) => ({
  authMethods: state.auth.authMethods,
  isLoading: state.loading.AUTH_METHODS,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthMethods: () => {
    dispatch(getAuthMethods());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
