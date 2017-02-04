var React = require('react');
var ReactDOM = require('react-dom');
var DragDropContainer = require('react-drag-drop-container');
import Gorilla from './Gorilla';

var App = React.createClass({
	render () {
		return (
			<div>
				<DragDropContainer returnToBase={false}>
					<Gorilla />
				</DragDropContainer>

				<div style={{ 'float': 'left' }}>
					<DragDropContainer 
						dataKey="food_data" 
						dragData={{'label': 'banana', 'tastes': 'yummy'}}
					>
						<img src="https://s28.postimg.org/bocsgf43d/banana.png" height="45"/>
					</DragDropContainer>

					<DragDropContainer
						dataKey="food_data"
						dragData={{'label': 'cheeseburger', 'tastes': 'excellent'}}
						dragGhost={<div style={{backgroundColor: '#eaa', padding: 6, borderRadius: 4}}>Cheeseburger!</div>}
					>
						<img src="https://s28.postimg.org/3o335ocjd/surprise.png" height="45"/>
					</DragDropContainer>

					<DragDropContainer 
						dataKey="food_data" 
						dragData={{'label': 'orange', 'tastes': 'yummy'}}
					>
						<img src="https://s28.postimg.org/3yalp0r5l/orange.png" height="45"/>
					</DragDropContainer>
					
					<DragDropContainer
						dataKey="food_data"
						dragData={{'label': 'pickle', 'tastes': 'bad'}}
					>
						<img src="https://s28.postimg.org/5em475u2h/pickle.png" height="45"/>
					</DragDropContainer>

					<DragDropContainer
						dataKey="food_data"
						dragData={{'label': 'dogfood', 'tastes': 'yummy'}}
						dragHandleClassName="drag_handle"
					>
						<div>
							<div className="drag_handle" style={{backgroundColor:"#aaa"}}>Grab here</div>
							<div style={{backgroundColor: "#eee"}}>this<br/>you<br/>cannot<br/>grab!<br/></div>
							<div className="drag_handle" style={{backgroundColor:"#aaa"}}>Grab here</div>
						</div>
					</DragDropContainer>
					<br/><br/><br/>
				</div>

			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
