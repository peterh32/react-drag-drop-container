# DragDropContainer

Wrapper component for dragging an element and dropping it on a target. 

* Emulates HTML5 events __dragEnter__, __dragLeave__, and __drop__ so you can use it 
as-is on many HTML5 drag targets.

* Works on mouse and touch devices.

* Can set it up to drag the element itself or drag a "ghost" node that 
represents the element.

* Can specify a __dataKey__ to help drop targets recognize compatible drag items, for 
example so that compatible targets will highlight when you drag over them.

* Can also customize drag event names -- another way for your targets to 
recognize compatible drag items.

* Can specify a className to use for draghandle(s).

* Can tell the element to return-to-base after dragging, or to stay where you put it.

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
var DragDropContainer = require('react-drag-drop-container');

<DragDropContainer>Example</DragDropContainer>
```
Specify the data that will accompany the drag:
```
<DragDropContainer dragData={{'label': 'Example', 'id': 123}}>
	Example
</DragDropContainer>
```

Specify a data key for your data:
```
<DragDropContainer dragData={{'label': 'Example', 'id': 123}} dataKey="foo">
	Example
</DragDropContainer>
```

Go look at your element -- it should now be draggable.

#### Set up Target(s)

Tell your target(s) to capture drag/drop events:
```
  componentDidMount() {
    var elem = this.refs.my_component;  // get DOM element
    elem.addEventListener('dragEnter', (ev) => {this.handleDragEnter(ev)}, false);
    elem.addEventListener('dragLeave', (ev) => {this.handleDragLeave(ev)}, false);
    elem.addEventListener('drop', (ev) => {this.handleDrop(ev)}, false);
  }
```
(You could also use custom event names, see [section below](#dragentereventname-dragleaveeventname-dropeventname).)

Add a method to check whether the dragged item is compatible with this target,
based on the ```dataKey``` value you set above:
```
  // Check drag data using HTML 5 dataTransfer.types property
  isCompatible(ev){
    return ev.dataTransfer.types.indexOf('foo') !== -1;
  }
```

Add a method to grab the drag data from the event (this follows HTML 5 practice),
again using the ```dataKey``` you set above.
```
  // Retrieve drag data using HTML 5 dataTransfer.getData method
  getData(ev){
    return ev.dataTransfer.getData('foo');
  }
```

Now add handlers for the events:
```
  handleDragEnter(ev){
    if (this.isCompatible(ev)) {
 	  this.setState({'highlighted': true})
	}
  }

  handleDragLeave(ev){
    if (this.isCompatible(ev)) {
 	  this.setState({'highlighted': false})
	}
  }
  
  handleDrop(ev){
    if (this.isCompatible(ev)) {
      let data = this.getData(ev);
      ... do something with data ...
    }
  }
```

#### What if I want the target to "consume" the draggable?
The events passed to the target include a reference to the drag source DOM element
in __event.sourceElement__. Use this to hide or delete the source element after a successful
drop!
```
  event.sourceElement.style.visibility = 'hidden';
```


### Properties

##### dragData
Data about the dragged item that you want to pass to the target. Default is empty object.

##### dataKey
They key for retrieving the dragData from the event. Default is 'data'.

##### dragHandleClassName
Class name for drag handle(s). Optional. If omitted, the whole thing is grabbable.

##### customEventNameDragEnter, customEventNameDragLeave, customEventNameDrop
Optional custom names for the three events. You can use these
to tell your target which events to watch for. (This lets you write a little
less code in the target, since it doesn't have to validate the 
event data before highlighting or whatever). 

Defaults are dragEnter, dragLeave, and drop.


##### dragGhost
If a DOM node is provided, we'll drag it instead of the actual object (which
will remain in place). 

Example:
```
let ghost = <div class="drag_elem">Drag Me</div>;

<DragDropContainer dragGhost={ghost}>
```

##### returnToBase
Defaults to true. If false, then dragged item stays where you put it when you drop.


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



## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

__PUT LICENSE HERE__

Copyright (c) 2017 Medidata.

