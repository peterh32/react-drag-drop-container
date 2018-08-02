import React from 'react';
import { DragDropContainer } from '../src/index';


export default class DragElementWithClickHandlers extends React.Component {
  state = {
    clicked: false,
    over: false,
  };

  styles = {fontSize: 32, fontWeight: 'bold', margin: 20, cursor: 'pointer'};

  handleClick = () => {
    this.setState({clicked: !this.state.clicked});
  };

  handleMouseOver = () => {
    this.setState({over: true});
  };

  handleMouseOut = () => {
    this.setState({over: false});
  };

  render() {
    return (
      <div>
        <h2>Demo: Draggable Element With Other Event Handlers</h2>
        <h4>Click or hover over the draggable panda bear to activate event handlers.</h4> 
        <div style={{float: 'left'}}>
          <DragDropContainer dragClone={false}>
            <img
              onClick={this.handleClick}
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}
              style={this.styles}
              src="img/panda.jpg"
            />
          </DragDropContainer>
        </div>
        <div style={{float: 'left', margin: 20}}>
          <div>{this.state.clicked ? 'Clicked!' : 'Unclicked'}</div>
          <div>{this.state.over ? 'Hovering!' : 'Not hovering'}</div>
        </div>
        <div style={{clear: 'both'}}>&nbsp;</div>
      </div>
    )
  }
}
