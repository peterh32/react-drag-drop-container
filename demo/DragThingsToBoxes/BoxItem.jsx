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
      this.state = {transitions: false};
      this.height = 0;
    }

    componentDidMount() {
      this.height = this.elem.offsetHeight;
      console.log(this.height)
    }
    
    handleDrop = (e) => {
      e.stopPropagation();
      this.props.swap(e.dragData.index, this.props.index, e.dragData);
      e.containerElem.style.visibility="hidden";
    };
  
    deleteMe = () => {
      this.props.kill(this.props.uid);
    };

    transitionsOn = () => {
      if(!this.state.transitions) {
        this.setState({transitions: true});
      }
    };

    transitionsOff = () => {
      this.setState({transitions: false});
    };
  
    render() {
      /*
        Notice how these are wrapped in a DragDropContainer (so you can drag them) AND
        in a DropTarget (enabling you to rearrange items in the box by dragging them on
        top of each other)
      */
      const className = "box_item_component" + (this.state.transitions ? ' transitions_on' : ' transitions_off');

      return (
        <div className={className} ref={(c) => { this.elem = c; }}>
          <DragDropContainer
              targetKey="boxItem"
              dragData={{label: this.props.children, index: this.props.index}}
              onDrop={this.deleteMe}
              onDrag={this.transitionsOn}
              onDragEnd={this.transitionsOff}
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