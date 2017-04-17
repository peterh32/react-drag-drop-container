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
        onHit={this.dropped}
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
        onDrop={this.landedOn}
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
          <Food dragGhost="clone" targetKey="dogFood" label="cheeseburger" tastes="Yummy" image="img/surprise.png"/>
          <Food targetKey="fruitsAndVeggies" label="orange" tastes="Delicious" image="img/orange.png"/>
          <Food dragGhost={<div>Pickle</div>} targetKey="dogFood" label="pickle" tastes="It tasted weird" image="img/pickle.png"/>
        </div>
        <ul>
          <li><strong>targetKey</strong> to specify compatible drag items and drop targets.</li>
          <li><strong>dragData</strong> to pass the food name and taste ("Yummy", "Weird").</li>
          <li><strong>onDrop</strong> callback to tell the drag item what it was dropped on (shown in console.log).</li>
          <li><strong>dragGhost</strong> (on the cheeseburger) to drag a separate element.</li>
          <li><strong>returnToBase</strong> to specify whether items return to their original location when released.</li>
        </ul>


      </div>
    )
  }
}