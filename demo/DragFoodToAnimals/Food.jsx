import React from 'react';
import { DragDropContainer } from '../../src';

/* 
    Food is a draggable element (in a DragDropContainer)
*/

export default class Food extends React.Component {
    landedOn(e) {
      console.log('I was dropped on ' + e.dropData.name)
      console.log({'onDrop event passed back to Food': e});
    }
  
    render() {
      // note use of render prop below, rather than child element
      return (
        <DragDropContainer
          targetKey={this.props.targetKey}
          dragClone={this.props.dragClone || false}
          dragData={{label: this.props.label, tastes: this.props.tastes}}
          customDragElement={this.props.customDragElement}
          onDrop={this.landedOn}
          render = {() => {
            return <img src={this.props.image} height="45" style={{ marginLeft: 40}}/>
          }}
        />
          
      );
    }
  }