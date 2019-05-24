import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";

export default class WinnerScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <Row>
      <Col lg={4} md={6}>
        <div className="card text-center">
          <div className="card-body">
            <div className="caption">
              <img style={{width: '100%'}} src="https://avatarfiles.alphacoders.com/855/85557.png" alt="JsBattle"/>
              &nbsp;
            </div>
          </div>
        </div>
      </Col>
      <Col lg={8} md={6}>
        <h1>Girgetto</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="text-right">Score: 100</th>
            </tr>
        </thead>
        <div>
        <div>
    <h1>Progress</h1>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <p>
                  Battle Won: 10
                </p>
                <p>
                  Battle Lost: 10
                </p>
                <p>
                  Enemy Killed: 100
                </p>
                <p>
                  Death: 5
                </p>
              </div>
              <div>
                <img src="https://img.freepik.com/free-vector/star-rating-with-numbers_1017-6183.jpg?size=338&ext=jpg" />
              </div>
              <div></div>
            </div>
        </div>
        </div>
        </table>
      </Col>
    </Row>;
  }
}
