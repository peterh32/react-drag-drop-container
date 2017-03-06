import React from 'react';
import { DropTarget } from 'react-drag-drop-container';
/*
 * ExpandsOnDragEnter -- for testing offset issues
 */

class ExpandsOnDragEnter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      big: false
    };
  }

  render() {
    var styles = {
      paddingBottom: (this.state.big ? 60 : 0),
      paddingRight: (this.state.big ? 60 : 0),
      backgroundColor: "#eee",
      textAlign: "center",
    };
    return (
      <DropTarget compatKey="puppy" onDragEnter={() => this.setState({big: true})} onDragLeave={() => this.setState({big: false})}>
        <DropTarget compatKey="gorilla" onDragEnter={() => this.setState({big: true})} onDragLeave={() => this.setState({big: false})}>
        <h3 style={styles} ref={(el) => {this.elem = el;}}>
          EXPANDS<br/>ON<br/>DRAGOVER
        </h3>
        </DropTarget>
      </DropTarget>
    );
  }
}
export default ExpandsOnDragEnter;
