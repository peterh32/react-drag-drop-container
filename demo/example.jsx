var React = require('react');
var ReactDOM = require('react-dom');
import BasicDragDemo from './BasicDragDemo';
import DragFoodToAnimalsDemo from './DragFoodToAnimals/DragFoodToAnimalsDemo';
import DragThingsToBoxesDemo from './DragThingsToBoxes/DragThingsToBoxesDemo';
import DragElementWithClickHandlers from './DragElementWithClickHandlers';

var App = React.createClass({

	render () {
		return (
			<div>
				<DragThingsToBoxesDemo/>
				<hr />
				<DragFoodToAnimalsDemo/>
				<hr />
				<BasicDragDemo />
				<hr />
				<DragElementWithClickHandlers />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
