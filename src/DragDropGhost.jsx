import React from 'react';
/**
 * Optional "ghost" node for dragging with DragDropContainer
 */

class DragDropGhost extends React.Component {
  componentDidMount() {
    this.props.setGhostElem(this.ghostElem);
  }

  render() {
    const styles = {
      position: 'absolute',
      zIndex: this.props.zIndex,
      left: this.props.left,
      top: this.props.top,
      display: this.props.dragging ? 'block' : 'none',
    };
    return (
      <div style={styles} ref={(c) => { this.ghostElem = c; }}>
        {this.props.children}
      </div>
    );
  }
}

DragDropGhost.propTypes = {
  children: React.PropTypes.node.isRequired,
  setGhostElem: React.PropTypes.func.isRequired,
  dragging: React.PropTypes.bool.isRequired,
  left: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  zIndex: React.PropTypes.number.isRequired,
};

export default DragDropGhost;
