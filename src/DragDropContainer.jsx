import React from 'react';
var randomstring = require("randomstring");
import DragDropGhost from './DragDropGhost';

class DragDropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'clickX': 0,
      'clickY': 0,
      'left': 0,
      'top': 0,
      'initialLeftOffset': 0,
      'initialTopOffset': 0,
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

    this.checkForOffsetChanges = this.checkForOffsetChanges.bind(this);
    this.getChildrenWithDraggableFalse = this.getChildrenWithDraggableFalse.bind(this);

    // The DOM elem we're dragging, and the elements we're dragging over.
    // Changes to these do not trigger a re-render and so don't need to go in state
    this.dragElem = null;
    this.containerElem = null;
    this.currentTarget = null;
    this.prevTarget = null;

    // Using IDs rather than refs to get DOM elements
    this.containerId = randomstring.generate({charset: 'alphabetic'});
    this.ghostId = randomstring.generate({charset: 'alphabetic'});
  }

  componentDidMount() {
    this.containerElem = document.getElementById(this.containerId);
    // figure out what we're going to drag
    if (this.props.dragGhost) {
      this.dragElem = document.getElementById(this.ghostId);
    } else {
      this.dragElem = this.containerElem;
    }
    // capture events
    if (this.props.dragHandleClassName) {
      let elems = this.containerElem.getElementsByClassName(this.props.dragHandleClassName);
      for (let i=0; i<elems.length; i++){
        this.addListeners(elems[i]);
      }
    } else {
      this.addListeners(this.containerElem);
    }
  }

  addListeners(elem) {
    elem.addEventListener('mousedown', (e) => {this.handleMouseDown(e);}, false);
    elem.addEventListener('touchstart', (e) => {this.handleTouchStart(e);}, false);
  }

  createEvent(eventName, x, y) {
    let e;
    if (typeof window.CustomEvent !== 'function') {
      // we are in IE 11 and must use old-style method of creating event
      e = document.createEvent('CustomEvent');
      e.initCustomEvent(eventName, true, true, {});
    } else {
      e = new CustomEvent(eventName, {'bubbles': true, 'cancelable': true});
    }
    // Add useful data to the event
    Object.assign(e, {
      dragData: this.props.dragData,
      dragElem: this.dragElem,
      sourceElem: this.containerElem
    });
    return e;
  }

  setCurrentTarget(x, y) {
    // drop the z-index to get this elem out of the way, figure out what we're dragging over, then reset the z index
    this.dragElem.style.zIndex = -1;
    let target = document.elementFromPoint(x, y) || document.body;
    this.dragElem.style.zIndex = this.props.zIndex;
    // prevent it from selecting itself as the target
    this.currentTarget = this.dragElem.contains(target) ? document.body : target;
  }

  generateEnterLeaveEvents(x, y) {
    // generate events as we enter and leave elements while dragging
    let prefix = this.props.targetKey;
    this.setCurrentTarget(x, y);
    if (this.currentTarget !== this.prevTarget) {
      if (this.prevTarget) {this.prevTarget.dispatchEvent(this.createEvent(`${prefix}DragLeave`, x, y));}
      if (this.currentTarget) {this.currentTarget.dispatchEvent(this.createEvent(`${prefix}DragEnter`, x, y));}
    }
    this.prevTarget = this.currentTarget;
  }

  generateDropEvent(x, y) {
    // generate a drop event in whatever we're currently dragging over
    this.setCurrentTarget(x, y);
    this.currentTarget.dispatchEvent(this.createEvent(`${this.props.targetKey}Drop`, x, y));
  }

  // Start the Drag
  handleMouseDown(e) {
    if (e.buttons === 1 && !this.props.noDragging) {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      this.startDrag(e.clientX, e.clientY);
    }
  }

  handleTouchStart(e){
    if (!this.props.noDragging) {
      e.preventDefault();
      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchend', this.handleTouchEnd);
      this.startDrag(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    }
  }

  startDrag(x, y){
    document.addEventListener(`${this.props.targetKey}Dropped`, this.props.onDropped);
    this.setState({
      clicked: true,
      clickX: x - this.state.left,
      clickY: y - this.state.top,
      initialLeftOffset: this.state.dragged ? this.state.initialLeftOffset : this.containerElem.offsetLeft,
      initialTopOffset: this.state.dragged ? this.state.initialTopOffset : this.containerElem.offsetTop,
    });
    this.props.onStartDrag(this.props.dragData);
  }

  // During Drag
  handleMouseMove(e) {
    if (!this.props.noDragging) {
      e.preventDefault();
      if (this.state.clicked){
        this.drag(e.clientX, e.clientY);
      }
    }
  }

  handleTouchMove(e) {
    if (!this.props.noDragging) {
      e.preventDefault();
      if (this.state.clicked){
        this.drag(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
      }
    }
  }

  drag (x, y){
    // drop the z-index, figure out what element we're dragging over, then reset the z index
    this.generateEnterLeaveEvents(x, y);
    let [dx, dy] = this.checkForOffsetChanges();
    let stateChanges = {dragging: true};
    if (!this.props.yOnly) {stateChanges['left'] = dx + x - this.state.clickX}
    if (!this.props.xOnly) {stateChanges['top'] = dy + y - this.state.clickY}
    this.setState(stateChanges);
    this.props.onDragging(this.props.dragData, this.currentTarget, x, y);
  }

  // Drop
  handleMouseUp(e) {
    this.setState({clicked: false});
    if (this.state.dragging){
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      this.drop(e.clientX, e.clientY);
    }
  }

  handleTouchEnd(e) {
    this.setState({clicked: false});
    if (this.state.dragging){
      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchend', this.handleTouchEnd);
      this.drop(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    }
  }

  drop(x, y){
    // document.removeEventListener(`${this.props.targetKey}Dropped`, this.handleDrop);
    this.generateDropEvent(x, y);
    if (this.props.returnToBase){
      this.setState({left: 0, top: 0, dragging: false});
    } else {
      this.setState({dragged: true, dragging: false});
    }
    this.props.onEndDrag(this.props.dragData, this.currentTarget, x, y);
  }

  checkForOffsetChanges(){
    // deltas for when the system moves, e.g. from other elements on the page that change size on dragover.
    let dx, dy;
    if (this.props.dragGhost) {
      dx = this.state.initialLeftOffset - this.containerElem.offsetLeft;
      dy = this.state.initialTopOffset - this.containerElem.offsetTop;
    } else {
      dx = this.state.initialLeftOffset + this.state.left - this.containerElem.offsetLeft;
      dy = this.state.initialTopOffset + this.state.top - this.containerElem.offsetTop;
    }
    return [dx, dy];
  }

  getChildrenWithDraggableFalse(){
    // because otherwise can conflict with built-in browser dragging behavior
    let inputReactObject = React.Children.only(this.props.children);
    let clonedChild = React.cloneElement(inputReactObject, {
      draggable: "false"
    });
    return clonedChild;
  }

  render() {
    let styles = {
      'position': 'relative'
    };

    let ghost = '';
    if (this.props.dragGhost){
      // dragging will be applied to the "ghost" element
      ghost = (
        <DragDropGhost dragging={this.state.dragging} left={this.state.left} top={this.state.top} zIndex={this.props.zIndex} ghostId={this.ghostId}>
          {this.props.dragGhost}
        </DragDropGhost>
      );
    } else {
      // dragging will be applied to the DragDropContainer itself
      styles['left'] = this.state.left;
      styles['top'] = this.state.top;
      styles['zIndex'] = this.state.dragging || this.state.dragged ? (this.props.zIndex) : 'inherit';
    }
    return (
      <div style={styles}  id={this.containerId}>
        {this.getChildrenWithDraggableFalse()}
        {ghost}
      </div>
    );
  }
}

DragDropContainer.propTypes = {
  children: React.PropTypes.any.isRequired,

  // Determines what you can drop on
  targetKey: React.PropTypes.string,

  // We will pass this to the target when you drag or drop over it
  dragData: React.PropTypes.object,

  // If provided, we'll drag this instead of the actual object
  dragGhost: React.PropTypes.node,

  // If included, we'll only let you drag by grabbing the draghandle
  dragHandleClassName: React.PropTypes.string,

  // if True, then dragging is turned off
  noDragging: React.PropTypes.bool,

  // callbacks (optional):
  onDropped: React.PropTypes.func,
  onDragging: React.PropTypes.func,
  onEndDrag: React.PropTypes.func,
  onStartDrag: React.PropTypes.func,

  // If true, then object will return to its starting point after you let go of it
  returnToBase: React.PropTypes.bool,

  // Constrain dragging to the x or y directions only
  xOnly: React.PropTypes.bool,
  yOnly: React.PropTypes.bool,

  // Defaults to 1000 while dragging, but you can customize it
  zIndex: React.PropTypes.number
};

DragDropContainer.defaultProps = {
  targetKey: 'ddc',
  dragData: {},
  dragGhost: null,
  dragHandleClassName: '',
  onStartDrag: () => {},
  onDragging: () => {},
  onEndDrag: () => {},
  onDropped: () => {},
  noDragging: false,
  returnToBase: false,
  xOnly: false,
  yOnly: false,
  zIndex: 1000
};

export default DragDropContainer;
