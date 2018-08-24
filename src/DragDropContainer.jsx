import React from 'react';

function usesLeftButton(e) {
  const button = e.buttons || e.which || e.button;
  return button === 1;
}

class DragDropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickX: 0,
      clickY: 0,
      initialLeftOffset: 0,
      initialTopOffset: 0,
      left: 0,
      top: 0,
      clicked: false,
      dragging: false,
    };

    // The DOM elem we're dragging, and the elements we're dragging over.
    this.dragElem = null;
    this.containerElem = null;
    this.sourceElem = null;
    this.currentTarget = null;
    this.prevTarget = null;

    this._isMounted = true;
  }

  componentDidMount() {
    // set draggable attribute 'false' on any images, to prevent conflicts w browser native dragging
    const imgs = this.containerElem.getElementsByTagName('IMG');
    for (let i = 0; i < imgs.length; i += 1) {
      imgs[i].setAttribute('draggable', 'false');
    }

    // capture events
    if (this.props.dragHandleClassName) {
      // if drag handles
      const elems = this.containerElem.getElementsByClassName(this.props.dragHandleClassName);
      for (let i = 0; i < elems.length; i += 1) {
        this.addListeners(elems[i]);
        elems[i].style.cursor = 'move';
      }
    } else {
      // ... or not
      this.addListeners(this.containerElem);
      this.containerElem.style.cursor = 'move';
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addListeners = (elem) => {
    elem.addEventListener('mousedown', (e) => { this.handleMouseDown(e); }, false);
    elem.addEventListener('touchstart', (e) => { this.handleTouchStart(e); }, false);
    // must add touchmove listener here in order for preventDefault() to work, to prevent scrolling during drag..
    elem.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    elem.addEventListener('touchend', this.handleTouchEnd);
  };

  buildCustomEvent = (eventName, extraData = {}) => {
    let e;
    if (typeof window.CustomEvent !== 'function') {
      // we are in IE 11 and must use old-style method of creating event
      e = document.createEvent('CustomEvent');
      e.initCustomEvent(eventName, true, true, {});
    } else {
      e = new CustomEvent(eventName, { bubbles: true, cancelable: true });
    }
    // Add useful data to the event
    Object.assign(e, {
      dragData: this.props.dragData,
      dragElem: this.dragElem,
      containerElem: this.containerElem,
      sourceElem: this.sourceElem,
    }, extraData);
    return e;
  };

  setCurrentTarget = (x, y) => {
    // drop the z-index to get this elem out of the way, figure out what we're dragging over, then reset the z index
    this.dragElem.style.zIndex = -1;
    const target = document.elementFromPoint(x, y) || document.body;
    this.dragElem.style.zIndex = this.props.zIndex;
    // prevent it from selecting itself as the target
    this.currentTarget = this.dragElem.contains(target) ? document.body : target;
  };

  generateEnterLeaveEvents = (x, y) => {
    // generate events as we enter and leave elements while dragging
    const prefix = this.props.targetKey;
    this.setCurrentTarget(x, y);
    if (this.currentTarget !== this.prevTarget) {
      if (this.prevTarget) { this.prevTarget.dispatchEvent(this.buildCustomEvent(`${prefix}DragLeave`)); }
      if (this.currentTarget) { this.currentTarget.dispatchEvent(this.buildCustomEvent(`${prefix}DragEnter`)); }
    }
    this.prevTarget = this.currentTarget;
  };

  generateDropEvent = (x, y) => {
    // generate a drop event in whatever we're currently dragging over
    this.setCurrentTarget(x, y);
    const customEvent = this.buildCustomEvent(`${this.props.targetKey}Drop`, { x, y });
    this.currentTarget.dispatchEvent(customEvent);
  };

  // Start the Drag
  handleMouseDown = (e) => {
    if (usesLeftButton(e) && !this.props.noDragging) {
      window.getSelection().removeAllRanges(); // prevent firefox native-drag issue when image is highlighted
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      this.startDrag(e.clientX, e.clientY);
    }
  };

  handleTouchStart = (e) => {
    if (!this.props.noDragging) {
      e.stopPropagation();
      this.startDrag(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    }
  };

  startDrag = (clickX, clickY) => {
    document.addEventListener(`${this.props.targetKey}Dropped`, this.props.onDrop);
    const rect = this.containerElem.getBoundingClientRect();
    this.setState({
      clicked: true,
      clickX,
      clickY,
      initialLeftOffset: rect.left - clickX,
      initialTopOffset: rect.top - clickY,
      left: rect.left,
      top: rect.top,
    });
    this.props.onDragStart(this.props.dragData);
  };

  // During Drag
  handleMouseMove = (e) => {
    if (!this.props.noDragging) {
      e.preventDefault();
      if (this.state.clicked) {
        this.drag(e.clientX, e.clientY);
      }
    }
  };

  handleTouchMove = (e) => {
    if (!this.props.noDragging) {
      e.preventDefault();  // prevents window scrolling
      if (this.state.clicked) {
        this.drag(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
      }
    }
  };

  drag = (x, y) => {
    this.generateEnterLeaveEvents(x, y);
    const stateChanges = { dragging: true };
    if (!this.props.yOnly) { stateChanges.left = this.state.initialLeftOffset + x; }
    if (!this.props.xOnly) { stateChanges.top = this.state.initialTopOffset + y; }
    this.setState(stateChanges);
    this.props.onDrag(this.props.dragData, this.currentTarget, x, y);
  };

  // Drop
  handleMouseUp = (e) => {
    this.setState({ clicked: false });
    if (this.state.dragging) {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      this.drop(e.clientX, e.clientY);
      window.getSelection().removeAllRanges(); // prevent weird-looking highlights
    }
  };

  handleTouchEnd = (e) => {
    this.setState({ clicked: false });
    if (this.state.dragging) {
      this.drop(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  };

  drop = (x, y) => {
    this.generateDropEvent(x, y);
    document.removeEventListener(`${this.props.targetKey}Dropped`, this.props.onDrop);
    this._isMounted && this.setState({ dragging: false });
    this.props.onDragEnd(this.props.dragData, this.currentTarget, x, y);
  };

  getHideStyle = () => {
    const hideSource = this.state.dragging && !this.props.dragClone && !this.props.customDragElement;
    const nukeSource = hideSource && this.props.disappearDraggedElement;
    if (nukeSource) {
      return {display: 'none'};
    } else if (hideSource){
      return {visibility: 'hidden'};
    }
    return {}
  };

  render() {
    // dragging will be applied to the "ghost" element
    let ghostContent;
    if (this.props.customDragElement) {
      ghostContent = this.props.customDragElement;
    } else {
      ghostContent = this.props.children;   // dragging a clone
    }

    const ghostStyles = {
      position: 'fixed',
      cursor: 'move',
      left: this.state.left,
      top: this.state.top,
      zIndex: this.props.zIndex,
      opacity: this.props.dragElemOpacity,
      display: this.state.dragging ? 'block' : 'none',
    };

    const ghost = (
      <div style={ghostStyles} ref={(c) => { this.dragElem = c; }}>
        {ghostContent}
      </div>
    );

    return (
      <div style={{ position: 'relative', display: 'inline-block' }} ref={(c) => { this.containerElem = c; }}>
        <span style={this.getHideStyle()} ref={(c) => { this.sourceElem = c; }}>
          {this.props.children}
        </span>
        {ghost}
      </div>
    );
  }
}

DragDropContainer.propTypes = {
  children: React.PropTypes.node.isRequired,

  // Determines what you can drop on
  targetKey: React.PropTypes.string,

  // If provided, we'll drag this instead of the actual object. Takes priority over dragClone if both are set
  customDragElement: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),

  // Makes the dragged element completely disappear while dragging so that it takes up no space
  disappearDraggedElement: React.PropTypes.bool,

  // If true, then we will drag a clone of the object instead of the object itself. See also customDragElement
  dragClone: React.PropTypes.bool,

  // ghost will display with this opacity
  dragElemOpacity: React.PropTypes.number,

  // We will pass this data to the target when you drag or drop over it
  dragData: React.PropTypes.object,

  // If included, we'll only let you drag by grabbing elements with this className
  dragHandleClassName: React.PropTypes.string,

  // if True, then dragging is turned off
  noDragging: React.PropTypes.bool,

  // callbacks (optional):
  onDrop: React.PropTypes.func,
  onDrag: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
  onDragStart: React.PropTypes.func,

  // Constrain dragging to the x or y directions only
  xOnly: React.PropTypes.bool,
  yOnly: React.PropTypes.bool,

  // Defaults to 1000 while dragging, but you can customize it if you need it to go higher
  zIndex: React.PropTypes.number,
};

DragDropContainer.defaultProps = {
  targetKey: 'ddc',
  customDragElement: null,
  disappearDraggedElement: false,
  dragClone: false,
  dragElemOpacity: 0.9,
  dragData: {},
  dragHandleClassName: '',
  onDragStart: () => {},
  onDrag: () => {},
  onDragEnd: () => {},
  onDrop: () => {},
  noDragging: false,
  xOnly: false,
  yOnly: false,
  zIndex: 1000,
};

export default DragDropContainer;
