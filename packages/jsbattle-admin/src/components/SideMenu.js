import React, {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {withRouter} from 'react-router-dom';

import {
  faShieldAlt,
  faUsers,
  faCog,
  faTrophy,
  faCode,
  faUserClock
} from '@fortawesome/free-solid-svg-icons';

class SideMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const pathname = this.props.location.pathname;
    return (
      <div style={{paddingTop: '1em'}} className="side-menu">
        <Nav className="flex-column" variant="pills" >
          <Nav.Link href="#/users" active={pathname == '/users'} className="sidenav-users">
            <FontAwesomeIcon icon={faUsers} /> Users
          </Nav.Link>
          <Nav.Link href="#/sessions" active={pathname == '/sessions'} className="sidenav-users">
            <FontAwesomeIcon icon={faUserClock} /> Sessions
          </Nav.Link>
          <Nav.Link href="#/scripts" active={pathname == '/scripts'} className="sidenav-battles">
            <FontAwesomeIcon icon={faCode} /> Scripts
          </Nav.Link>
          <Nav.Link href="#/league" active={pathname == '/league'} className="sidenav-league">
            <FontAwesomeIcon icon={faTrophy} /> League
          </Nav.Link>
          <Nav.Link href="#/battles" active={pathname == '/battles'} className="sidenav-battles">
            <FontAwesomeIcon icon={faShieldAlt} /> Battles
          </Nav.Link>
          <Nav.Link href="#/system" active={pathname == '/system'} className="sidenav-system">
            <FontAwesomeIcon icon={faCog} /> System
          </Nav.Link>
        </Nav>
      </div>
    );
  }

}

SideMenu.defaultProps = {

};

SideMenu.propTypes = {

};
export default withRouter(SideMenu);
