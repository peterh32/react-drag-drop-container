import React from 'react';
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
  componentDidMount() {
    this.elem.addEventListener('dragEnter', (ev) => {this.setState({'big': true});}, false);
    this.elem.addEventListener('dragLeave', (ev) => {this.setState({'big': false});}, false);
  }

  render() {
    var styles = {
      paddingBottom: (this.state.big ? 60 : 0),
      paddingRight: (this.state.big ? 60 : 0),
      backgroundColor: "#eee",
      textAlign: "center",
    };
    return (
      <h3 style={styles} ref={(el) => {this.elem = el;}}>
        EXPANDS<br/>ON<br/>DRAGOVER
      </h3>
    );
  }
}
export default ExpandsOnDragEnter;
