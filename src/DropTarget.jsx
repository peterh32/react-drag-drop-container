import React from 'react';

class DropTarget extends React.Component {
  constructor(props) {
    super(props);
    this.elem = null;
    this.handleDrop = this.handleDrop.bind(this);
  }
  componentDidMount() {
    this.elem.addEventListener(`${this.props.targetKey}DragEnter`, (e) => { this.props.onDragEnter(e); }, false);
    this.elem.addEventListener(`${this.props.targetKey}DragLeave`, (e) => { this.props.onDragLeave(e); }, false);
    this.elem.addEventListener(`${this.props.targetKey}Drop`, (e) => { this.handleDrop(e); }, false);
  }

  createEvent(eventName, eventData) {
    // utility to create an event
    let e;
    if (typeof window.CustomEvent !== 'function') {
      // we are in IE 11 and must use old-style method of creating event
      e = document.createEvent('CustomEvent');
      e.initCustomEvent(eventName, true, true, {});
    } else {
      e = new CustomEvent(eventName, { bubbles: true, cancelable: true });
    }
    Object.assign(e, eventData);
    return e;
  }

  handleDrop(e) {
    // tell the drop source about the drop, then do the callback
    const evt = this.createEvent(`${this.props.targetKey}Dropped`, { dropElem: this.elem, dropData: this.props.dropData });
    e.sourceElem.dispatchEvent(evt);
    this.props.onHit(e);
  }

  render() {
    return (
      <span ref={(t) => { this.elem = t; }}>
        {this.props.children}
      </span>
    );
  }
}

DropTarget.propTypes = {
  children: React.PropTypes.node.isRequired,

  // needs to match the targetKey in the DragDropContainer
  targetKey: React.PropTypes.string,

  // data that gets sent back to the DragDropContainer and shows up in its onDrop() callback event
  dropData: React.PropTypes.object,

  // callbacks
  onDragEnter: React.PropTypes.func,
  onDragLeave: React.PropTypes.func,
  onHit: React.PropTypes.func,
};

DropTarget.defaultProps = {
  targetKey: 'ddc',
  onDragEnter: () => {},
  onDragLeave: () => {},
  onHit: () => () => {},
  dropData: {},
};

export default DropTarget;
