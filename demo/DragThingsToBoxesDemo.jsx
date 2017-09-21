import React from 'react';
var shortid = require('shortid');
import { DragDropContainer, DropTarget } from '../src/index';

class BoxItem extends React.Component {
  // the things that appear in the boxes
  constructor(props) {
    super(props);
    this.state = {
      highlighted: false,
    };
    this.highlight = this.highlight.bind(this);
    this.unHighlight = this.unHighlight.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  highlight() {
    this.setState({highlighted: true});
  }

  unHighlight() {
    this.setState({highlighted: false});
  }

  handleDrop(e) {
    e.stopPropagation();
    this.unHighlight();
    this.props.swap(e.dragData.index, this.props.index, e.dragData);
    e.sourceElem.style.visibility="hidden";
  }

  render() {
    const styles = {
      color: 'white',
      borderRadius: 3,
      padding: 5,
      margin: 3,
      display: 'inline-block',
      backgroundColor: '#bbb'
    };
    let outerStyles = {
      paddingLeft: 1,
      marginLeft: 2,
      borderLeft: '3px solid transparent'
    };
    if (this.state.highlighted) {
      outerStyles.borderLeft = '3px solid darkblue';
    }
    return (
        <DragDropContainer
          targetKey="box"
          returnToBase={true}
          dragData={{label: this.props.children, index: this.props.index}}
          onDrop={() => {this.props.kill(this.props.uid)}}
        >
          <DropTarget
            onHit={this.handleDrop}
            onDragEnter={this.highlight}
            onDragLeave={this.unHighlight}
            targetKey="box"
          >
            <div style={outerStyles}>
              <div style={styles}>{this.props.children}</div>
            </div>
        </DropTarget>
      </DragDropContainer>
    );
  }
}

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.kill = this.kill.bind(this);
    this.swap = this.swap.bind(this);
  }

  handleDrop(e) {
    let items = this.state.items.slice();
    items.push({label: e.dragData.label, uid: shortid.generate()});
    this.setState({items: items});
    e.sourceElem.style.visibility="hidden";
  }

  swap(fromIndex, toIndex, dragData) {
    let items = this.state.items.slice();
    const item = {label: dragData.label, uid: shortid.generate()};
    items.splice(toIndex, 0, item);
    this.setState({items: items});
  }

  kill(uid){
    let items = this.state.items.slice();
    const index = items.findIndex((item) => {
      return item.uid == uid
    });
    if (index !== -1) {
      items.splice(index, 1);
    }
    this.setState({items: items});
  }

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
    return (
      <DragDropContainer dragHandleClassName="grab_me">
        <DropTarget
          onHit={this.handleDrop}
          targetKey={this.props.targetKey}
          dropData={{name: this.props.name}}
        >
          <div style={styles}>
            <div className="grab_me" style={{position: 'absolute', bottom: 0, right: 0}}>x</div>
            {this.state.items.map((item, index) => {
              return (
                <BoxItem key={item.uid} uid={item.uid} kill={this.kill} index={index} swap={this.swap}>
                  {item.label}
                </BoxItem>
              )
            })}
          </div>
        </DropTarget>
      </DragDropContainer>
    );
  }
}

class BoxMe extends React.Component {
  // the things you can drag into a box
  render() {
    return (
      <DragDropContainer
        targetKey={this.props.targetKey}
        returnToBase={true}
        dragData={{label: this.props.label}}
        customDragElement={this.props.customDragElement}
        onDragStart={()=>(console.log('start'))}
        onDrag={()=>(console.log('dragging'))}
        onDragEnd={()=>(console.log('end'))}
        onDrop={(e)=>(console.log(e))}

      >
        <img src={this.props.image} height="45" style={{ marginLeft: 40}}/>
      </DragDropContainer>
    );
  }
}

export default class DragThingsToBoxesDemo extends React.Component {
  render() {
    return (
      <div>
        <h2>Demo: Drag things into boxes</h2>
        You can also drag between boxes and drag to re-order within boxes, and drag the boxes using the x as a drag handle.
        <div className="things_to_drag">
          <BoxMe targetKey="box" label="bananas"  image="img/banana.png"/>
          <BoxMe targetKey="box" label="cheeseburger"  image="img/surprise.png"/>
          <BoxMe targetKey="box" label="orange" image="img/orange.png"/>
          <BoxMe targetKey="box" label="pickle" image="img/pickle.png"/>
          <BoxMe targetKey="box" label="gorilla" image="img/gorilla.png"/>
          <BoxMe targetKey="box" label="puppy" image="img/puppy.png"/>
        </div>
        <div className="boxes">
          <Box targetKey="box"/>
          <br/>
          <Box targetKey="box"/>
        </div>


      </div>
    )
  }
}