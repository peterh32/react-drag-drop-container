import React from 'react';
import PropTypes from 'prop-types';

class DropTarget extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			highlighted: false,
		};

		this.targetElement = null;

		this.setTargetElementRef = this.setTargetElementRef.bind(this);
	}

	componentDidMount() {
		const { targetKey } = this.props;

		this.targetElement.addEventListener(`${targetKey}DragEnter`, this.handleDragEnter);
		this.targetElement.addEventListener(`${targetKey}DragLeave`, this.handleDragLeave);
		this.targetElement.addEventListener(`${targetKey}Drop`, this.handleDrop);
	}

	setTargetElementRef(node) {
		this.targetElement = node;
	}

	createEvent(eventName, eventData) {
		const event = new CustomEvent(eventName, { bubbles: true, cancelable: true });

		Object.assign(event, eventData);
		return event;
	}

	// tell the drop source about the drop, then do the callback
	handleDrop = event => {
		const { targetKey, dropData, onHit } = this.props;
		const evt = this.createEvent(`${targetKey}Dropped`, {
			dropData,
			dragData: event.dragData,
			dropElem: this.targetElement,
		});

		event.containerElem.dispatchEvent(evt);
		onHit(event);
		this.setState({ highlighted: false });
	}

	handleDragEnter = event => {
		const { highlightClassName, onDragEnter } = this.props;

		highlightClassName && this.setState({ highlighted: true });

		onDragEnter(event);
	}

	handleDragLeave = event => {
		const { highlightClassName, onDragLeave } = this.props;

		highlightClassName && this.setState({ highlighted: false });

		onDragLeave(event);
	}


	render() {
		const { highlightClassName, render: propsRender, children } = this.props;
		const { highlighted } = this.state;
		const targetElemClassNames = `droptarget ${highlighted ? highlightClassName : ''}`;

		return (
			<span ref={this.setTargetElementRef} className={targetElemClassNames}>
				{propsRender ? propsRender() : children}
			</span>
		);
	}
}

DropTarget.propTypes = {
	children: PropTypes.node,
	render: PropTypes.func,
	highlightClassName: PropTypes.string,

	// needs to match the targetKey in the DragDropContainer -- matched via the enter/leave/drop event names, above
	targetKey: PropTypes.string,

	// data that gets sent back to the DragDropContainer and shows up in its onDrop() callback event
	dropData: PropTypes.string,

	// callbacks
	onDragEnter: PropTypes.func,
	onDragLeave: PropTypes.func,
	onHit: PropTypes.func,
};

DropTarget.defaultProps = {
	children: null,
	targetKey: 'ddc',
	onDragEnter: () => {},
	onDragLeave: () => {},
	onHit: () => () => {},
	dropData: {},
	highlightClassName: 'highlighted',
	render: null,
};

export default DropTarget;
