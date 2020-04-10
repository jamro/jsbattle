import {withRouter} from 'react-router-dom';
import FullRow from "../components/FullRow.js";
import React from "react";
import {connect} from 'react-redux';

export class Footer extends React.Component {

  render() {
    return <FullRow>
            <small style={{color: '#999', textAlign: 'center', borderTop: '1px solid #999', width: "100%", display: 'inline-block', padding: '5px'}}>
              Hosted on <a href="https://github.com/jamro/jsbattle" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" aria-hidden="true"></i> GitHub</a>.
              This project is licensed under the terms of the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT license</a>.
              Version: {VERSION}
            </small>
          </FullRow>;
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Footer));
