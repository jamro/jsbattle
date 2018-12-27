import Col from "./Col.js";
export default class FullRow extends React.Component {

  render() {
    return <div className="row">
      <Col xs={12} sm={12} md={12} lg={12} >
        {this.props.children}
      </Col>
    </div>;
  }
}
