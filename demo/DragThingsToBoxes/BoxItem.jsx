import React from 'react';
import { DragDropContainer, DropTarget } from '../../src';

/*
    BoxItem - a thing that appears in a box, after you drag something into the box
*/

export default class BoxItem extends React.Component {
    // the things that appear in the boxes
    constructor(props) {
      super(props);
      this.state = {
        highlighted: false,
      };
    }
  
    highlight = () => {
      this.setState({highlighted: true});
    };
  
    unHighlight = () => {
      this.setState({highlighted: false});
    };
  
    handleDrop = (e) => {
      e.stopPropagation();
      this.unHighlight();
      this.props.swap(e.dragData.index, this.props.index, e.dragData);
      e.containerElem.style.visibility="hidden";
    };
  
    deleteMe = () => {
      this.props.kill(this.props.uid);
    };
  
    render() {
      const styles = {
        color: 'white',
        borderRadius: 5,
        padding: 10,
        margin: 3,
        display: 'inline-block',
        backgroundColor: '#005577',
        width: 90,
      };
      let outerStyles = {
        paddingLeft: 1,
        marginLeft: 2,
        borderTop: '3px solid transparent'
      };
      if (this.state.highlighted) {
        outerStyles.borderTop = '3px solid darkblue';
      }

      /*
        Notice how these are wrapped in a DragDropContainer (so you can drag them) AND
        in a DropTarget (enabling you to rearrange items in the box by dragging them on
        top of each other)
      */

      return (
        <div style={outerStyles}>
          <DragDropContainer
              targetKey="boxItem"
              dragData={{label: this.props.children, index: this.props.index}}
              onDrop={this.deleteMe}
              disappearDraggedElement={true}
            >
              <DropTarget
                onHit={this.handleDrop}
                onDragEnter={this.highlight}
                onDragLeave={this.unHighlight}
                targetKey="boxItem"
              >
                <div style={styles}>{this.props.children}</div>
            </DropTarget>
          </DragDropContainer>
        </div>
      );
    }
  }