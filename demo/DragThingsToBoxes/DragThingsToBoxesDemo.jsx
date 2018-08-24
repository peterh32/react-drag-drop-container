import React from 'react';
import Boxable from './Boxable';
import Box from './Box';


export default class DragThingsToBoxesDemo extends React.Component {
  render() {
    return (
      <div>
        <h2>Demo: Drag things into boxes</h2>
        You can also drag between boxes and drag to re-order within boxes, and drag the boxes using the x as a drag handle.
        <div className="things_to_drag">
          <Boxable targetKey="box" label="bananas"  image="img/banana.png"/>
          <Boxable targetKey="box" label="cheeseburger"  image="img/surprise.png"/>
          <Boxable targetKey="box" label="orange" image="img/orange.png"/>
          <Boxable targetKey="box" label="pickle" image="img/pickle.png"/>
          <Boxable targetKey="box" label="gorilla" image="img/gorilla.png"/>
          <Boxable targetKey="box" label="puppy" image="img/puppy.png"/>
        </div>
        <div className="boxes">
          <Box targetKey="box"/>
          <br/>
          <Box targetKey="box"/>
        </div>

        <h3>Notes:</h3>
        When you drag an item into a box, the Box element gets info from the onHit event's dragData property
        and uses it to construct a BoxItem. You can then drag BoxItems between boxes.
        <ul>
          <li><strong>dragHandleClassName</strong> specify that you can only drag a box by grabbing the 'x'.</li>
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