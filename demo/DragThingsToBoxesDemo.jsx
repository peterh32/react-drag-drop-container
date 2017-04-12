import React from 'react';
var shortid = require('shortid');
import { DragDropContainer, DropTarget } from '../src/index';

class BoxItem extends React.Component {

  render() {
    const styles = {
      border: "1px solid #666",
      borderRadius: 2,
      padding: 3,
      margin: 3,
      display: 'inline-block'
    };
    return (
      <DragDropContainer
        targetKey="for_box"
        returnToBase={true}
        dragData={{'label': this.props.children}}
        onDropped={() => {this.props.kill(this.props.uid)}}
      >
        <div style={styles}>{this.props.children}</div>
      </DragDropContainer>
    );
  }
}

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: false,
      items: []
    };
    this.highlight = this.highlight.bind(this);
    this.unHighlight = this.unHighlight.bind(this);
    this.dropped = this.dropped.bind(this);
    this.kill = this.kill.bind(this);
  }

  highlight() {
    this.setState({highlighted: true});
  }

  unHighlight() {
    this.setState({highlighted: false});
  }

  dropped(e) {
    let items = this.state.items.slice();
    items.push({label: e.dragData.label, uid: shortid.generate()});
    this.setState({items: items});
    e.sourceElem.style.visibility="hidden";
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
      border: "2px solid purple",
      borderRadius: 4,
      width: 200,
      height: 200,
      margin: 10,
      float: 'left'
    };
    return (
      <DropTarget
        onDrop={this.dropped}
        onDragEnter={this.highlight}
        onDragLeave={this.unHighlight}
        targetKey={this.props.targetKey}
        dropData={{name: this.props.name}}
      >
        <div style={styles}>
          {this.state.items.map((item) => {
            return <BoxItem key={item.uid} uid={item.uid} kill={this.kill}>{item.label}</BoxItem>
          })}
        </div>
      </DropTarget>
    );
  }
}

class BoxMe extends React.Component {
  render() {
    return (
      <DragDropContainer
        targetKey={this.props.targetKey}
        returnToBase={true}
        dragData={{label: this.props.label, tastes: this.props.tastes}}
        dragGhost={this.props.dragGhost}
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
        <h2>Demo 3: Drag things into boxes</h2>
        You can also drag between boxes
        <div className="animals">
            <Box targetKey="for_box"/>

            <Box targetKey = "for_box"/>
        </div>
        <div className="foods">
          <BoxMe targetKey="for_box" label="bananas"  image="img/banana.png"/>
          <BoxMe targetKey="for_box" label="cheeseburger"  image="img/surprise.png"/>
          <BoxMe targetKey="for_box" label="orange" image="img/orange.png"/>
          <BoxMe targetKey="for_box" label="pickle" image="img/pickle.png"/>
          <BoxMe targetKey="for_box" label="gorilla" image="img/gorilla.png"/>
          <BoxMe targetKey="for_box" label="puppy" image="img/puppy.png"/>
        </div>


      </div>
    )
  }
}