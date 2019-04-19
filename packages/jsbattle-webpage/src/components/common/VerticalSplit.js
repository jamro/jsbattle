export default class VerticalSplit extends React.Component {

  constructor(props) {
    super(props);
    this.leftArea = this.props.children[0];
    this.rightArea = this.props.children[1];
    this.leftAreaDOM =  React.createRef();
    this.rightAreaDOM =  React.createRef();
    this.dragging = false;
  }

  beginDrag(e) {
    e.preventDefault();
    this.dragging = true;

    function cumulateOffset(obj, property, sum) {
      sum = sum || 0;
      sum += obj[property];
      if(obj.offsetParent) {
        return cumulateOffset(obj.offsetParent, property, sum);
      } else {
        return sum;
      }
    }

    function updateGhostPosition(ghostBar, ref, x) {
      ghostBar.style.height = ref.current.clientHeight + "px";
      ghostBar.style.top = cumulateOffset(ref.current, "offsetTop") + "px";
      ghostBar.style.left = (x - ghostBar.clientWidth/2) + "px";
    }

    let ghostBar = document.createElement('div');
    document.body.appendChild(ghostBar);
    ghostBar.classList.add('vertical-split-ghostbar');
    updateGhostPosition(ghostBar, this.rightAreaDOM, e.pageX);

    function onMouseMove(event) {
      ghostBar.style.left = (event.pageX - ghostBar.clientWidth/2) + "px";
    }

    let onMouseUp;
    onMouseUp = (event) => {
      if(!this.dragging) return;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      let x = Math.max(0, Math.min(window.innerWidth, event.pageX));
      let percentage = ((x + ghostBar.clientWidth/2) / window.innerWidth) * 100;

      this.rightAreaDOM.current.style.display = 'table-cell';
      this.leftAreaDOM.current.style.display = 'table-cell';
      if(percentage < 5) {
        this.leftAreaDOM.current.style.display = 'none';
        percentage = 0;
      } else if (percentage > 95) {
        this.rightAreaDOM.current.style.display = 'none';
        percentage = 100;
      }
      percentage = Math.min(Math.max(0, percentage), 100);
      this.leftAreaDOM.current.style.width = percentage + "%";
      this.rightAreaDOM.current.style.width = (100-percentage) + "%";

      this.dragging = false;
      ghostBar.remove();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  render() {
    return <div className="vertical-split">
      <div className="vertical-split-container">
        <div className="vertical-split-left" ref={this.leftAreaDOM}>
          {this.leftArea}
        </div>
        <div
          className="vertical-split-dragbar"
          onMouseDown={(e) => this.beginDrag(e)}
        ></div>
        <div className="vertical-split-right" ref={this.rightAreaDOM}>
          {this.rightArea}
        </div>
      </div>
    </div>;
  }
}
