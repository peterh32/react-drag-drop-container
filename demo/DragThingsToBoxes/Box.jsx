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
      /*
          Note the two layers of DropTarget. 
          This enables it to handle dropped items from 
          outside AND items dragged between boxes.
      */
      return (
        <div className="component_box">
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
                <div className="box">
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
        </div>
      );
    }
  }