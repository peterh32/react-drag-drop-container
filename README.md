# DragDropContainer and DropTarget

Live demo: [peterh32.github.io/react-drag-drop-container](http://peterh32.github.io/react-drag-drop-container/)

Make something draggable:
```
import { DragDropContainer } from 'react-drag-drop-container';

<DragDropContainer>
    <div>Look, I'm Draggable!</div>
</DragDropContainer>
```

Set up a drop target:
```
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

<DragDropContainer targetKey="foo" >
    <div>Drag Me!</div>
</DragDropContainer>

<DropTarget targetKey="foo" >
    <p>I'm a valid drop target for the object above since we both have the same targetKey!</p>
</DropTarget>
```

Wire up events and data on the DragDropContainer:
```
<DragDropContainer targetKey="foo" dragData={some object} onDragStart={some method} onDrop={some method}...>
    <div>Drag Me!</div>
</DragDropContainer>
```
__dragData__: Data to pass to the drop target.

__onDragStart__, __onDrag__, __onDragEnd__: Callbacks during the drag process. These are passed the dragData object set 
above. __onDrag__ and __onDragEnd__ are also passed dropTarget (the DOM element we're currently over), 
x, and y (current position).

__onDrop__: Callback that fires after a successful drop on a compatible target. It gets passed an event object that 
contains all this:
```
{
    dropData: [whatever you put in the dropData property for the DropTarget]
    dropElem: [reference to the DOM element being dragged]
    sourceElem: [reference to the DragDropContainer DOM element]
    target: [reference to the DropContainer DOM element]
}
```

Wire up events and data in the DropTarget:
```
<DropTarget targetKey="foo" dropData={some object} onDragEnter={highlight method} onDragLeave={unHighlight} onHit={some function}>
    <p>Drop something on me</p>
</DropTarget>
```

__dropData__: Data to pass back to the DragDropContainer.

__onDragEnter__, __onDragLeave__, __onHit__: Callbacks that fire when a compatible DragDropContainer 
passes over. __onHit__ is when a compatible container is dropped on the target. These
are passed an event containing...
```
{
    dragData: [whatever you put in the dragData property for the DragDropContainer]
    dragElem: [reference to the DOM element being dragged]
    sourceElem: [reference to the DragDropContainer DOM element]
    target: [reference to the DropContainer DOM element]
}
```


Wrapper components for dragging an element and dropping it on a target. 

* Works on mouse and touch devices.

* Can set it up to drag the element itself or drag a "ghost" node that 
represents the element.

* Use property __targetKey__ to to identify compatible drag elements 
and targets.

* Can specify drag handle(s) (if desired) with property __dragHandleClassName__.

* Can tell the element to return-to-base after dragging, or to stay where you put it.

* Can constrain dragging to one dimension, horizontal or vertical.

* Includes callback properties for __onStartDrag__, __onDragging__,  __onEndDrag__,
and __onDropped__. 
 
* Data from the target element is included with the __onDropped__ event triggered in 
the DragDropContainer.

## Demo 

Live demo: [peterh32.github.io/react-drag-drop-container](http://peterh32.github.io/react-drag-drop-container/)

To build the demo locally, run:

```
npm install
npm run launch
```

This should open the demo in a browser window on 
localhost:8080.

This error means you're already running 
something on port 8080:
```
events.js:160
      throw er; // Unhandled 'error' event
```

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

<DragDropContainer>
    <span>Example</span>
</DragDropContainer>
```
The element should now be draggable.

##### Set up for dragging to a target
Add the data you want to send to the target when you drop the element on it:
```
<DragDropContainer dragData={{label: 'Example', id: 123}}>
	<span>Example</span>
</DragDropContainer>
```

Specify targetKey. This determines what dropTargets will accept your drag:
```
<DragDropContainer dragData={{label: 'Example', id: 123}} targetKey="foo">
	<span>Example</span>
</DragDropContainer>
```


#### Set up Target(s)

Wrap an element in a DropTarget, giving it the same targetKey as your draggable:
```
  import { DropTarget } from 'react-drag-drop-container';

  <DropTarget targetKey="foo">
      [some element or text]
  </DropTarget>
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
  <DropTarget targetKey="foo" onDragEnter={this.highlight} onDragLeave={this.unHighlight} onHit={this.dropped}>
    <ChildElement highlighted=this.state.highlighted />
  </DropTarget>
```


### DragDropContainer Properties

##### dragData
Data about the dragged item that you want to pass to the target. Default is empty object.

##### targetKey
Optional string to specify which DropTargets will accept which DragDropContainers.

##### dragHandleClassName
Class name for drag handle(s). Optional. If omitted, the whole thing is grabbable.

__Tip:__ If you are using drag handles on an element that contains an image,
use `<img draggable="false"...` to prevent the browser from letting users 
drag the image itself, which can be confusing.


##### customDragElement
If a DOM node is provided, we'll drag it instead of the actual object (which
will remain in place). 

Example:
```
let elem = <div class="drag_elem">Drag Me</div>;

<DragDropContainer customDragElement={elem}>
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
##### onDragStart(dragData)
Runs when you start dragging. __dragData__ is whatever you passed in with
the dragData property.

##### onDrag(dragData, currentTarget, x, y)
Runs as you drag.  __currentTarget__ is the DOM element you're currently dragging
over; __x__ and __y__ are the current position.

##### onDragEnd(dragData, currentTarget, x, y)
When you drop.

##### onDrop(dropData, dropTarget)
Triggered after a drop onto a compatible DropTarget. __dropTarget__ is the DOM
element of the DropTarget you dropped on, and  __dropData__ 
is  an optional property of DropTarget. 

### DropTarget Properties

##### targetKey
Optional string to specify which DragDropContainers this target will accept.

##### dropData
Data to be provided to the DragDropContainer when it is dropped on the target.

#### Callbacks 

All optional; specify in props.
##### onDragEnter(e), onDragLeave(e), onHit(e)
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


## Development 

```
/src    Source code for components
/demo   Source code for demo
/lib/bundle.js  Transpiled output
/public   Demo files, compiled
```


## License

__NOT LICENSED__

Copyright (c) 2017.

