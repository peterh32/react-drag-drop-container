var React = require('react');
var ReactDOM = require('react-dom');
var DragDropContainer = require('react-drag-drop-container');
import Gorilla from './Gorilla';

var App = React.createClass({
	render () {
		return (
			<div>
				<div style={{ 'float': 'left' }}>
					<DragDropContainer 
						dataKey="food_data" 
						dragData={{'label': 'banana', 'tastes': 'yummy', 'domId': 'mybanana'}}
					>
						<img id="mybanana" src="img/banana.png"/>
					</DragDropContainer>
					
					<DragDropContainer 
						dataKey="food_data" 
						dragData={{'label': 'orange', 'tastes': 'yummy', 'domId': 'myorange'}}
					>
						<img id="myorange" src="img/orange.png"/>
					</DragDropContainer>
					
					<DragDropContainer
						dataKey="food_data"
						dragData={{'label': 'pickle', 'tastes': 'bad', 'domId': 'mypickle'}}
					>
						<img id="mypickle" src="img/pickle.png"/>
					</DragDropContainer>
					
					<br/><br/>
					
					<DragDropContainer
						dataKey="food_data"
						dragData={{'label': 'surprise', 'tastes': 'ok'}}
						dragGhost={<img id="surprise" src="img/surprise.png"/>}
					>
						<h2>Surprise!</h2>
					</DragDropContainer>
					
					<br/><br/><br/>
				</div>

				<DragDropContainer returnToBase={false}>
					<Gorilla />
				</DragDropContainer>
				
				
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
