import React from 'react';
var shortid = require('shortid');
import { DragDropContainer, DropTarget } from '../../src';
import BoxItem from './BoxItem';

export default class Box extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: []
      };
    }
  
    handleDrop = (e) => {
      let items = this.state.items.slice();
      items.push({label: e.dragData.label, uid: shortid.generate()});
      this.setState({items: items});
      e.containerElem.style.visibility="hidden";
    };
  
    swap = (fromIndex, toIndex, dragData) => {
      let items = this.state.items.slice();
      const item = {label: dragData.label, uid: shortid.generate()};
      items.splice(toIndex, 0, item);
      this.setState({items: items});
    };
  
    kill = (uid) => {
      let items = this.state.items.slice();
      const index = items.findIndex((item) => {
        return item.uid == uid
      });
      if (index !== -1) {
        items.splice(index, 1);
      }
      this.setState({items: items});
    };
  
    render() {
      const styles = {
        border: "2px solid black",
        borderRadius: 4,
        width: 400,
        height: 100,
        margin: 10,
        display: 'inline-block',
        position: 'relative',
      };
      /*
          Note the two layers of DropTarget. 
          This enables it to handle dropped items from 
          outside AND items dragged between boxes.
      */
      return (
        <DragDropContainer dragHandleClassName="grab_me">
          <DropTarget
            onHit={this.handleDrop}
            targetKey={this.props.targetKey}
            dropData={{name: this.props.name}}
          >
            <DropTarget
              onHit={this.handleDrop}
              targetKey="boxItem"
              dropData={{name: this.props.name}}
            >
              <div style={styles}>
                <div className="grab_me" style={{position: 'absolute', bottom: 0, right: 0}}>&times;</div>
                {this.state.items.map((item, index) => {
                  return (
                    <BoxItem key={item.uid} uid={item.uid} kill={this.kill} index={index} swap={this.swap}>
                      {item.label}
                    </BoxItem>
                  )
                })}
              </div>
            </DropTarget>
          </DropTarget>
        </DragDropContainer>
      );
    }
  }