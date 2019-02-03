
import BattleWidget from "../../common/battle/BattleWidget.js";

export default class BattleScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <BattleWidget
      {...this.props}
    />;
  }
}
