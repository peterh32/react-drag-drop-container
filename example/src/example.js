var React = require('react');
var ReactDOM = require('react-dom');
var DragDropContainer = require('react-drag-drop-container');

var App = React.createClass({
	render () {
		return (
			<div>
				<DragDropContainer />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
