import React from 'react';
import { DragDropContainer } from '../src/index';

export default function BasicDragDemo(props) {
  const styles = {fontSize: 32, fontWeight: 'bold', margin: 20, cursor: 'pointer', float: 'left'};
  return (
    <div>
      <h2>Demo 1: Drag in the directions indicated</h2>
      <DragDropContainer xOnly={true}><div style={styles}>↔</div></DragDropContainer>
      <DragDropContainer yOnly={true}><div style={styles}>↕</div></DragDropContainer>
      <DragDropContainer><img style={styles} src="img/4-way-arrow.png" width="24"/></DragDropContainer>
    </div>
  )
}