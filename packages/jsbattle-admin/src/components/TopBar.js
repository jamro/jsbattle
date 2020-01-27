import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

class TopBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let profileControl = null;
    if(this.props.username) {
      profileControl = <Nav>
        <Navbar.Text style={{paddingRight: '1em'}}>Signed in as <strong style={{color: '#fff'}}>{this.props.username || 'anonymous'}</strong></Navbar.Text>
        <Form inline>
          <Button variant="secondary" href="/auth/logout"><FontAwesomeIcon icon={faPowerOff} /></Button>
        </Form>
      </Nav>;
    }

    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand>JsBattle Admin Panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            {profileControl}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }

}

TopBar.defaultProps = {
  username: undefined,
  onLogout: () => {}
};

TopBar.propTypes = {
  username: PropTypes.string,
  onLogout: PropTypes.func
};
export default TopBar;
