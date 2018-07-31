var React = require('react');
var ReactDOM = require('react-dom');
import BasicDragDemo from './BasicDragDemo';
import DragFoodToAnimalsDemo from './DragFoodToAnimalsDemo';
import DragThingsToBoxesDemo from './DragThingsToBoxesDemo';
import DragElementWithClickHandlers from './DragElementWithClickHandlers';

var App = React.createClass({

	render () {
		return (
			<div>
				<DragFoodToAnimalsDemo/>
				<hr />
				<DragThingsToBoxesDemo/>
				<hr />
				<BasicDragDemo />
				<hr />
				<DragElementWithClickHandlers />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
