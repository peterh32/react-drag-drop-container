# DragDropContainer and DropTarget

Wrapper components for dragging an element and dropping it on a target. 

* Works on mouse and touch devices.

* Can set it up to drag the element itself or drag a "ghost" node that 
represents the element.

* Use property __compatKey__ to to identify compatible drag elements 
and targets.

* Can specify drag handle(s) (if desired) with property __dragHandleClassName__.

* Can tell the element to return-to-base after dragging, or to stay where you put it.

* Can constrain dragging to one dimension, horizontal or vertical.

* Includes callback properties for __onStartDrag__, __onDragging__, and __onEndDrag__.


## Demo 

Live demo: [peterh32.github.io/react-drag-drop-container](http://peterh32.github.io/react-drag-drop-container/)

To build the demo locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation
Install it in your project using npm:

```
npm install react-drag-drop-container --save
```


## Usage

#### Set up Draggable Element

Wrap your element in a DragDropContainer:

```
import { DragDropContainer } from 'react-drag-drop-container';

<DragDropContainer>Example</DragDropContainer>
```
The element should now be draggable.

##### Set up for dragging to a target
Add the data you want to send to the target when you drop the element on it:
```
<DragDropContainer dragData={{label: 'Example', id: 123}}>
	Example
</DragDropContainer>
```

Specify compatKey. This determines what dropTargets will accept your drag:
```
<DragDropContainer dragData={{label: 'Example', id: 123}} compatKey="foo">
	Example
</DragDropContainer>
```


#### Set up Target(s)

Wrap an element in a DropTarget, giving it the same compatKey as your draggable:
```
  import { DropTarget } from 'react-drag-drop-container';

  <DropTarget compatKey="foo">[some element or text]</DropTarget>
```

In DropTarget's parent, add handlers for the enter, leave, and drop events. For example:
```
  highlight(ev){
    this.setState({'highlighted': true})
  }

  unHighlight(ev){
 	this.setState({'highlighted': false})
  }
  
  dropped(ev){
    ... do something with event data ...
  }
```
Wire them up to DropTarget. In this example we are passing the "highlighted" state
to the child element, which we assume toggles some highlighted style.
```
  <DropTarget compatKey="foo" onDragEnter={this.highlight} onDragLeave={this.unHighlight} onDrop={this.dropped}>
    <ChildElement highlighted=this.state.highlighted />
  </DropTarget>
```


### DragDropContainer Properties

##### dragData
Data about the dragged item that you want to pass to the target. Default is empty object.

##### compatKey
Optional string to specify which DropTargets will accept which DragDropContainers.

##### dragHandleClassName
Class name for drag handle(s). Optional. If omitted, the whole thing is grabbable.

__Tip:__ If you are using drag handles on an element that contains an image,
use `<img draggable="false"...` to prevent the browser from letting users 
drag the image itself, which can be confusing.


##### dragGhost
If a DOM node is provided, we'll drag it instead of the actual object (which
will remain in place). 

Example:
```
let ghost = <div class="drag_elem">Drag Me</div>;

<DragDropContainer dragGhost={ghost}>
```
##### noDragging
If true, dragging is turned off.

##### returnToBase
If true, then dragged item goes back to where you put it when you drop.

##### xOnly, yOnly
If true, then dragging is constrained to the x- or y direction, respectively.

##### zIndex
The z-index for the dragged item defaults to 1000 (so that it floats over the target). 
If that doesn't work for you, change it here.


#### Callbacks 

All optional; specify in props.
##### onStartDrag(dragData)
Runs when you start dragging. __dragData__ is whatever you passed in with
the dragData property.

##### onDragging(dragData, currentTarget, x, y)
Runs as you drag.  __currentTarget__ is the DOM element you're currently dragging
over; __x__ and __y__ are the current position.

##### onDragEnd(dragData, currentTarget, x, y)
When you drop.

### DropTarget Properties

##### compatKey
Optional string to specify which DragDropContainers this target will accept.

#### Callbacks 

All optional; specify in props.
##### onDragEnter(e), onDragLeave(e), onDrop(e)
The event e contains
```
{
    dragData: [whatever you put in the dragData property for DragDropContainer]
    dragElem: [reference to the DOM element being dragged]
    sourceElem: [reference to the DragDropContainer DOM element]
}
```
The __sourceElem___ and __dragElem__ properties point to the same object unless you
set __dragGhost__ (see below), in which case __dragElem__ is the ghost, and __sourceElem__
is the DragDropContainer.

##### Example: make the target "consume" the draggable
Use __event.sourceElem__ to hide or delete the source element after a successful
drop.
```
  dropped(ev){
      ev.sourceElem.style.visibility = 'hidden';
  }
```


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

__PUT LICENSE HERE__

Copyright (c) 2017.

