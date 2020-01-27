import React, {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {withRouter} from 'react-router-dom';

import {
  faShieldAlt,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

class SideMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const pathname = this.props.location.pathname;
    return (
      <div style={{paddingTop: '1em'}}>
        <Nav className="flex-column" variant="pills" >
          <Nav.Link href="#/battles" active={pathname == '/battles'}><FontAwesomeIcon icon={faShieldAlt} /> Battles</Nav.Link>
          <Nav.Link href="#/users" active={pathname == '/users'}><FontAwesomeIcon icon={faUsers} /> Users</Nav.Link>
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
