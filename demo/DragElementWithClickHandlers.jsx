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
        <DragDropContainer dragClone={false}>
          <div style={{display: 'inline-block'}}>
          <img
            onClick={this.handleClick}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
            style={this.styles}
            src="img/panda.jpg"
          />
          </div>
        </DragDropContainer>
        <div style={{visibility: this.state.clicked ? 'visible' : 'hidden'}}>You clicked</div>
        <div style={{visibility: this.state.over ? 'visible' : 'hidden'}}>You are hovering</div>
      </div>
    )
  }
}
