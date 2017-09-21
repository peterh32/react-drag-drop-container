import React from 'react';
import { DragDropContainer } from '../src/index';

export default function BasicDragDemo(props) {
  const styles = {fontSize: 32, fontWeight: 'bold', margin: 20, cursor: 'pointer', float: 'left'};
  return (
    <div>
      <h2>Demo: Drag in the directions indicated</h2>
      <DragDropContainer xOnly={true}><div style={styles}>↔</div></DragDropContainer>
      <DragDropContainer yOnly={true}><div style={styles}>↕</div></DragDropContainer>
      <DragDropContainer><img style={styles} src="img/4-way-arrow.png" width="24"/></DragDropContainer>
      <textarea disabled value="<DragDropContainer xOnly={true}>[drag left and right]</DragDropContainer>" />
      <textarea disabled value="<DragDropContainer yOnly={true}>[drag up and down]</DragDropContainer>" />
      <textarea disabled value="<DragDropContainer>[drag anywhere]</DragDropContainer>" />
    </div>
  )
}