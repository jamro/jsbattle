import FullRow from "../../common/bootstrap/FullRow.js";
import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";
import BattleWidget from "../../common/battle/BattleWidget.js";

export default class ChallengeBattleScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <BattleWidget
      {...this.props}
    />;
  }
}
