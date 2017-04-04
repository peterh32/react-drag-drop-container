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
    this.props.onDrop(e);
  }

  render() {
    return (
      <div ref={(t) => { this.elem = t; }} style={Object.assign({ display: 'inline-block' }, this.props.style)}>
        {this.props.children}
      </div>
    );
  }
}

DropTarget.propTypes = {
  children: React.PropTypes.node.isRequired,
  targetKey: React.PropTypes.string,
  onDragEnter: React.PropTypes.func,
  onDragLeave: React.PropTypes.func,
  onDrop: React.PropTypes.func,
  dropData: React.PropTypes.object,
  style: React.PropTypes.object,
};

DropTarget.defaultProps = {
  targetKey: 'ddc',
  onDragEnter: () => { console.log('drag enter'); },  // eslint-disable-line no-console
  onDragLeave: () => { console.log('drag leave'); },  // eslint-disable-line no-console
  onDrop: () => { console.log('dropped!'); },  // eslint-disable-line no-console
  dropData: {},
  style: {},
};

export default DropTarget;
