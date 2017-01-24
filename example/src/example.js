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
						<img id="mybanana" src="https://s28.postimg.org/bocsgf43d/banana.png" height="32"/>
					</DragDropContainer>

					<br/><br/>
					<DragDropContainer
						dataKey="food_data"
						dragData={{'label': 'surprise', 'tastes': 'excellent'}}
						dragGhost={<img id="surprise" src="https://s28.postimg.org/3o335ocjd/surprise.png" height="32"/>}
					>
						Drag Me for a Surprise!
					</DragDropContainer>
					<br/><br/>
					
					<DragDropContainer 
						dataKey="food_data" 
						dragData={{'label': 'orange', 'tastes': 'yummy', 'domId': 'myorange'}}
					>
						<img id="myorange" src="https://s28.postimg.org/3yalp0r5l/orange.png" height="32"/>
					</DragDropContainer>
					
					<DragDropContainer
						dataKey="food_data"
						dragData={{'label': 'pickle', 'tastes': 'bad', 'domId': 'mypickle'}}
					>
						<img id="mypickle" src="https://s28.postimg.org/5em475u2h/pickle.png" height="32"/>
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
