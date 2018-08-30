import React from 'react';
import { DragDropContainer, DropTarget } from '../../src';
import './BoxItem.css';

/*
    BoxItem - a thing that appears in a box, after you drag something into the box
*/

export default class BoxItem extends React.Component {
    // the things that appear in the boxes
    constructor(props) {
      super(props);
    }
    
    handleDrop = (e) => {
      e.stopPropagation();
      this.props.swap(e.dragData.index, this.props.index, e.dragData);
      e.containerElem.style.visibility="hidden";
    };
  
    deleteMe = () => {
      this.props.kill(this.props.uid);
    };
  
    render() {
      /*
        Notice how these are wrapped in a DragDropContainer (so you can drag them) AND
        in a DropTarget (enabling you to rearrange items in the box by dragging them on
        top of each other)
      */

      return (
        <div className="box_item_component">
          <DragDropContainer
              targetKey="boxItem"
              dragData={{label: this.props.children, index: this.props.index}}
              onDrop={this.deleteMe}
              disappearDraggedElement={true}
              dragHandleClassName="grabber"
            >
              <DropTarget
                onHit={this.handleDrop}
                targetKey="boxItem"
              >
                <div className="outer">
                  <div className="item">
                    <span className="grabber">&#8759;</span>
                    {this.props.children}
                  </div>
                </div>
            </DropTarget>
          </DragDropContainer>
        </div>
      );
    }
  }