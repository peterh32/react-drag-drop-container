import React from 'react';
/**
 * A container for dragging an element and dropping it on a target.
 */

class DragDropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'clickX': 0,
      'clickY': 0,
      'left': 0,
      'top': 0,
      'clicked': false,
      'dragging': false,
      'dragged': false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.startDrag = this.startDrag.bind(this);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.drag = this.drag.bind(this);

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.drop = this.drop.bind(this);

    // these are not set in state they do not involve re-rendering
    this.dragElem = null;
    this.currentTarget = null;
    this.prevTarget = null;
  }

  componentDidMount() {
    if (this.props.dragGhost) {
      this.dragElem = this.refs['drag_ghost'].refs['the_ghost'];
    } else {
      this.dragElem = this.refs['drag_container'];
    }
  }

  createEvent(eventName, x, y) {
    var evt;
    if (typeof window.CustomEvent !== 'function') {
      // we are in IE 11 and must use old-style method of creating event
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(eventName, true, true, {});
    } else {
      evt = new CustomEvent(eventName, {'bubbles': true, 'cancelable': true});
    }
    // add stringified dragData to the event and make it accessible via html5-style method event.dataTransfer.getData()
    var data = JSON.stringify(this.props.dragData);
    evt.dataTransfer = {
      'getData': (arg)=>{return arg === this.props.dataKey ? data : undefined},
			'types': [this.props.dataKey]
    };
    return evt
  }

  setCurrentTarget(x, y) {
    // drop the z-index, figure out what element we're dragging over, then reset the z index
    this.dragElem.style.zIndex = -1;
    var target = document.elementFromPoint(x, y);
    this.dragElem.style.zIndex = this.props.zIndex;
    // prevent it from selecting itself as the target
    this.currentTarget = this.dragElem.contains(target) ? document.body : target;
  }

  generateEnterLeaveEvents(x, y) {
    this.setCurrentTarget(x, y);
    if (this.currentTarget !== this.prevTarget) {
      if (this.prevTarget) {this.prevTarget.dispatchEvent(this.createEvent(this.props.dragLeaveEventName, x, y));}
      if (this.currentTarget) {this.currentTarget.dispatchEvent(this.createEvent(this.props.dragEnterEventName, x, y))}
    }
    this.prevTarget = this.currentTarget;
  }

  generateDropEvent(x, y) {
    this.setCurrentTarget(x, y);
    this.currentTarget.dispatchEvent(this.createEvent(this.props.dropEventName, x, y));
  }

  // Start the Drag
  handleMouseDown(e) {
    e.preventDefault();
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
    this.startDrag(e.clientX, e.clientY);
  }

  handleTouchStart(e){
    e.preventDefault();
    document.addEventListener("touchmove", this.handleTouchMove);
    document.addEventListener("touchend", this.handleTouchEnd);
    this.startDrag(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
  }

  startDrag(x, y){
    this.setState({
      'clicked': true,
      'clickX': x - this.state.left,
      'clickY': y - this.state.top
    });
    this.props.onStartDrag(this.props.dragData);
  }

  // Drag
  handleMouseMove(e) {
    e.preventDefault();
    if (this.state.clicked){
      this.drag(e.clientX, e.clientY)
    }
  }

  handleTouchMove(e) {
    e.preventDefault();
    if (this.state.clicked){
      this.drag(e.targetTouches[0].pageX, e.targetTouches[0].pageY)
    }
  }

  drag (x, y){
    // drop the z-index, figure out what element we're dragging over, then reset the z index
    this.generateEnterLeaveEvents(x, y);
    this.setState({
      dragging: true,
      left: x - this.state.clickX,
      top: y - this.state.clickY
    });
    this.props.onDragging(this.props.dragData, this.currentTarget, x, y);
  }

  // Drop
  handleMouseUp(e) {
    this.setState({clicked: false});
    if (this.state.dragging){
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
      this.drop(e.clientX, e.clientY);
    }
  }

  handleTouchEnd(e) {
    this.setState({clicked: false});
    if (this.state.dragging){
      document.removeEventListener("touchmove", this.handleTouchMove);
      document.removeEventListener("touchend", this.handleTouchEnd);
      this.drop(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    }
  }

  drop(x, y){
    this.generateDropEvent(x, y);
    if (this.props.returnToBase){
      this.setState({left: 0, top: 0, dragging: false});
    } else {
      this.setState({dragged: true, dragging: false})
    }
    this.props.onEndDrag(this.props.dragData, this.currentTarget, x, y);
  }

  render() {
    var styles = {
      'position': 'relative'
    };

    var ghost = '';
    if (this.props.dragGhost){
      // dragging will be applied to the "ghost" element
      ghost = (
        <DragDropGhost dragging={this.state.dragging} left={this.state.left} top={this.state.top} zIndex={this.props.zIndex} ref="drag_ghost">
          {this.props.dragGhost}
        </DragDropGhost>
      )
    } else {
      // dragging will be applied to the DragDropContainer itself
      styles['left'] = this.state.left;
      styles['top'] = this.state.top;
      styles['zIndex'] = this.state.dragging || this.state.dragged ? (this.props.zIndex) : 'inherit';
    }
    return (
      <div style={styles} onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart} ref="drag_container">
        {this.props.children}
        {ghost}
      </div>
    );
  }
}

DragDropContainer.propTypes = {
  // callbacks (optional):
  onStartDrag: React.PropTypes.func,
  onDragging: React.PropTypes.func,
  onEndDrag: React.PropTypes.func,
  // We will pass a stringified version of this object to the target when you drag or drop over it
  dragData: React.PropTypes.object.isRequired,
  // The key that the target will use to retrieve dragData from the event with event.dataTransfer.getData([dataKey])
  dataKey: React.PropTypes.string,
  // If false, then object will not return to its starting point after you let go of it
  returnToBase: React.PropTypes.bool,
  // If provided, we'll drag this instead of the actual object
  dragGhost: React.PropTypes.node,
  // You can customize these to make it easy for your target to spot the events it's interested in
  dragEnterEventName: React.PropTypes.string,
  dragLeaveEventName: React.PropTypes.string,
  dropEventName: React.PropTypes.string,
  // Defaults to 1000 while dragging, but you can customize it
  zIndex: React.PropTypes.number
};

DragDropContainer.defaultProps = {
  onStartDrag: () => {},
  onDragging: () => {},
  onEndDrag: function(){},
  dataKey: 'data',
  returnToBase: true,
  dragEnterEventName: 'dragEnter',
  dragLeaveEventName: 'dragLeave',
  dropEventName: 'drop',
  zIndex: 1000
};

class DragDropGhost extends React.Component {
  render() {
    var styles = {
      'position': 'absolute',
      'zIndex': this.props.zIndex,
      'left': this.props.left,
      'top': this.props.top,
      'display': this.props.dragging ? 'block' : 'none'
    };
    return (
      <div style={styles} ref="the_ghost">
        {this.props.children}
      </div>
    )
  }
}


export default DragDropContainer;
