import React from 'react';
/*
 * Gorilla -- an example target component for DragDropContainer
 */

class Gorilla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'highlighted': false
    };
    this.dataKey = 'food_data'; // this is where Gorilla will look for the data in the drag object
  }
  componentDidMount() {
    this.refs.test_target.addEventListener('drop', (ev) => {this.handleDrop(ev);}, false);
    this.refs.test_target.addEventListener('dragEnter', (ev) => {this.setState({'highlighted': true});}, false);
    this.refs.test_target.addEventListener('dragLeave', (ev) => {this.setState({'highlighted': false});}, false);
  }

  getData(event){
    return event.dataTransfer.getData(this.dataKey);
  }

  getSourceElement(event) {
    return event.sourceElement;
  }

  handleDrop(ev){
    var data = this.getData(ev);
    if (data) {
			if (data.tastes != 'bad') {
				alert('Thanks for the ' + data.label + '! It is ' + data.tastes + '!');
        this.getSourceElement(ev).style.visibility = 'hidden';
      } else {
				alert('Yech! ' + data.label + ' are ' + data.tastes + '!');
			}
    }
		this.setState({'highlighted': false});
  }

  render() {
    var styles = {
      'position': 'absolute',
      'top': 30,
      'left': 500,
      'padding': 10,
      'backgroundColor': (this.state.highlighted ? 'aqua' : 'transparent'),
      'textAlign': 'center'
    };
    return (
      <div style={styles} ref="test_target">
        <img src="https://s28.postimg.org/5c28kbqex/gorilla.png" width="100"/>
      </div>
    );
  }
}
export default Gorilla;
