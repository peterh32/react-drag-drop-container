var React = require('react');
var ReactDOM = require('react-dom');
import BasicDragDemo from './BasicDragDemo';
import DragFoodToAnimalsDemo from './DragFoodToAnimalsDemo';
import DragThingsToBoxesDemo from './DragThingsToBoxesDemo';

var App = React.createClass({

	render () {
		return (
			<div>
				<BasicDragDemo />
				<hr />
				<DragFoodToAnimalsDemo/>
				<hr />
				<DragThingsToBoxesDemo/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
