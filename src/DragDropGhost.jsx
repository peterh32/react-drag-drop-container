import React from 'react';
/**
 * Optional "ghost" node for dragging with DragDropContainer
 */

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
      <div style={styles} id={this.props.ghostId}>
        {this.props.children}
      </div>
    );
  }
}

DragDropGhost.propTypes = {
  children: React.PropTypes.any,
  display: React.PropTypes.string,
  dragging: React.PropTypes.bool,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  ghostId: React.PropTypes.string.isRequired,
  zIndex: React.PropTypes.number
};

export default DragDropGhost;
