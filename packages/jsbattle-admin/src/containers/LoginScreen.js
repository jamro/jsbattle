import React, {Component} from "react";
import Loading from '../components/Loading.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import {
  faGithub,
  faFacebook,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import {
  faLock
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';
import {getAuthMethods} from '../actions';

class LoginScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAuthMethods();
  }

  render() {
    const config = {
      github: {
        icon: faGithub,
        color: '#fff',
        backgroundColor: '#333'
      },
      facebook: {
        icon: faFacebook,
        color: '#fff',
        backgroundColor: '#3b5998'
      },
      google: {
        icon: faGoogle,
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
        border: 0
      };
      const icon = authConfig ? authConfig.icon : faLock;
      return <Button key={providerName} variant="primary" size="lg" block href={auth.url} style={style}>
        <FontAwesomeIcon size="lg" className="float-left" icon={icon} /> Login with {auth.name}
      </Button>;
    });


    if(this.props.isLoading) {
      buttons = <Loading />;
    } else if(buttons.length == 0) {
      buttons = <em>No authorization method is configured :(</em>;
    }

    return (
      <div>
        <Container fluid="xl">
          <Row>
            <Col xl={12}>
              <div style={{margin: 'auto', width: '100%', maxWidth: '330px', padding: '5em 1em', textAlign: 'center'}}>
                <img src="./img/tank_login.png" alt="JsBattle" />
                <h1>Please sign in</h1>
                {buttons}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

LoginScreen.defaultProps = {
  authMethods: {}
};

LoginScreen.propTypes = {
  authMethods: PropTypes.object
};

const mapStateToProps = (state) => ({
  authMethods: state.auth.authMethods,
  isLoading: state.loading.AUTH_METHODS,
});
const mapDispatchToProps = (dispatch) => ({
  getAuthMethods: () => dispatch(getAuthMethods())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
