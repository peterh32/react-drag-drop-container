import React from 'react';
import { DragDropContainer, DropTarget } from '../src/index';

class Animal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {highlighted: false};
    this.highlight = this.highlight.bind(this);
    this.unHighlight = this.unHighlight.bind(this);
    this.dropped = this.dropped.bind(this);
  }

  highlight() {
    this.setState({highlighted: true});
  }

  unHighlight() {
    this.setState({highlighted: false});
  }

  dropped(e) {
    e.sourceElem.style.visibility="hidden";
    alert(`Thanks for the ${e.dragData.label}! ${e.dragData.tastes}!`);
    this.setState({highlighted: false});
  }

  render() {
    let styles = {
      padding: 10,
      borderRadius: 30,
      margin: 40,
      backgroundColor: (this.state.highlighted ? 'aqua' : 'transparent')
    };
    return (
      <DropTarget
        onDrop={this.dropped}
        onDragEnter={this.highlight}
        onDragLeave={this.unHighlight}
        targetKey={this.props.targetKey}
        dropData={{name: this.props.name}}
      >
        <div style={styles}>
          <img src={this.props.image} width="100"/>
        </div>
      </DropTarget>
    );
  }
}

class Food extends React.Component {
  landedOn(e) {
    console.log('I was dropped on ' + e.dropData.name)
  }

  render() {
    return (
      <DragDropContainer
        targetKey={this.props.targetKey}
        returnToBase={true}
        dragData={{label: this.props.label, tastes: this.props.tastes}}
        dragGhost={this.props.dragGhost}
        onDropped={this.landedOn}
      >
        <img src={this.props.image} height="45" style={{ marginLeft: 40}}/>
      </DragDropContainer>
    );
  }
}

export default class DragFoodToAnimalsDemo extends React.Component {
  render() {
    return (
      <div>
        <h2>Demo 2: Drag the food to the correct animal</h2>
        You can also drag the animal
        <div className="animals">
          <DragDropContainer>
            <Animal image="img/gorilla.png" targetKey="fruitsAndVeggies" name="Kong"/>
          </DragDropContainer>

          <DragDropContainer>
            <Animal image="img/puppy.png" targetKey="dogFood" name="Skippy"/>
          </DragDropContainer>
        </div>
        <div className="foods">
          <Food targetKey="fruitsAndVeggies" label="bananas" tastes="Yummy" image="img/banana.png"/>
          <Food targetKey="dogFood" label="cheeseburger" tastes="Yummy" image="img/surprise.png"/>
          <Food targetKey="fruitsAndVeggies" label="orange" tastes="Delicious" image="img/orange.png"/>
          <Food targetKey="dogFood" label="pickle" tastes="It tasted weird" image="img/pickle.png"/>
        </div>
      </div>
    )
  }
}