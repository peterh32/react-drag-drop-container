import React from 'react';
import { DragDropContainer, DropTarget } from '../../src';
import Animal from './Animal';
import Food from './Food';

export default class DragFoodToAnimalsDemo extends React.Component {
  render() {

    // we will use this as a custom drag element
    const customElem = <button style={{marginTop:20, marginLeft:20}}>Bananas!!</button> 

    const scrollBoxStyle = {
      float:'left', width: 120, height: 200, overflow: 'scroll', marginTop: 40, border: '1px solid black',
    };

    return (
      <div className='drag_food_to_animals'>
        <h2>Demo: Drag the food from the scrolling box to the correct animal</h2>
        <div className="foods" style={scrollBoxStyle}>
          <Food targetKey="fruitsAndVeggies" label="orange" tastes="Delicious" image="img/orange.png"/>
          <Food targetKey="dogFood" label="pickle" tastes="It tasted weird" image="img/pickle.png"/>
          <Food dragClone={true} dragElemOpacity={0.4} targetKey="dogFood" label="cheeseburger" tastes="Yummy" image="img/surprise.png"/>
          <Food customDragElement={customElem} targetKey="fruitsAndVeggies" label="bananas" tastes="Yummy" image="img/banana.png"/>
        </div>
        <div className="animals">
            <Animal targetKey="fruitsAndVeggies" name="Kong">
              <img src="img/gorilla.png" width="100"/>
              <h5>I eat fruit</h5>
            </Animal>

            <Animal targetKey="dogFood" name="Skippy">
              <img src="img/puppy.png" width="100"/>
              <h5>I eat meat & pickles</h5>
            </Animal>

            <Animal targetKey="dogFood" name="Bozo">
              <Animal targetKey="fruitsAndVeggies" name="Bozo">
                <img src="img/trashcan.png" width="100"/>
                <h5>I eat everything</h5>
              </Animal>
            </Animal>

        </div>
        <h3>Notes:</h3>
        <ul>
          <li><strong>targetKey</strong> to specify compatible drag items and drop targets.</li>
          <li><strong>dragData</strong> to pass the food name and taste ("Yummy", "Weird").</li>
          <li><strong>onDrop</strong> callback to tell the drag item what it was dropped on (shown in console.log).</li>
          <li><strong>customDragElement</strong> (on the bananas) to drag a custom element.</li>
          <li><strong>dragClone</strong> (on the cheeseburger) to drag a copy.</li>
          <li><strong>Trick:</strong> Wrap element in multiple DropTargets to handle different 
          types of data with different targetKeys (as on the trash can).</li>
        </ul>
      </div>
    )
  }
}
