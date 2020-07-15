import React from 'react';
import PropTypes from 'prop-types';

function usesLeftButton(e) {
	const button = e.buttons || e.which || e.button;

	return button === 1;
}

class DragDropContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			leftOffset: 0,
			topOffset: 0,
			left: 0,
			top: 0,
			clicked: false,
			isDragging: false,
		};

		// The DOM elem we're dragging, and the elements we're dragging over.
		this.dragElem = null;
		this.containerElem = null;
		this.sourceElem = null;
		this.currentTarget = null;
		this.prevTarget = null;

		// scrolling at edge of window
		this.scrollTimer = null;
		this.xScroll = 0;
		this.yScroll = 0;

		this.setContainerElemRef = this.setContainerElemRef.bind(this);
		this.setDragElemRef = this.setDragElemRef.bind(this);
		this.setSourceElemRef = this.setSourceElemRef.bind(this);
	}

	setContainerElemRef(node) {
		this.containerElem = node;
	}

	setDragElemRef(node) {
		this.dragElem = node;
	}

	setSourceElemRef(node) {
		this.sourceElem = node;
	}

	componentDidMount() {
		this.containerElem.addEventListener('mousedown', this.handleMouseDown);
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	removeListeners = () => {
		const { targetKey, onDrop } = this.props;

		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('mouseup', this.handleMouseUp);
		document.removeEventListener(`${targetKey}Dropped`, onDrop);
	};

	buildCustomEvent = (eventName, extraData = {}) => {
		const e = new CustomEvent(eventName, { bubbles: true, cancelable: true });

		// Add useful data to the event
		Object.assign(e, {
			dragData: this.props.dragData,
			dragElem: this.dragElem,
			containerElem: this.containerElem,
			sourceElem: this.sourceElem,
		}, extraData);

		return e;
	};

	// drop the z-index to get this elem out of the way, figure out what we're dragging over, then reset z-index
	setCurrentTarget = (x, y) => {
		this.dragElem.style.zIndex = -1;
		const target = document.elementFromPoint(x, y) || document.body;
		this.dragElem.style.zIndex = this.props.zIndex;
		// prevent it from selecting itself as the target
		this.currentTarget = this.dragElem.contains(target) ? document.body : target;
	};

	generateEnterLeaveEvents = (x, y) => {
		// generate events as we enter and leave elements while dragging
		const { targetKey } = this.props;

		this.setCurrentTarget(x, y);

		if (this.currentTarget !== this.prevTarget) {
			if (this.prevTarget)
				this.prevTarget.dispatchEvent(this.buildCustomEvent(`${targetKey}DragLeave`));

			if (this.currentTarget)
				this.currentTarget.dispatchEvent(this.buildCustomEvent(`${targetKey}DragEnter`));
		}

		this.prevTarget = this.currentTarget;
	};

	generateDropEvent = (x, y) => {
		const { targetKey } = this.props;

		// generate a drop event in whatever we're currently dragging over
		this.setCurrentTarget(x, y);
		const customEvent = this.buildCustomEvent(`${targetKey}Drop`, { x, y });
		this.currentTarget.dispatchEvent(customEvent);

		// to prevent multiplying events on drop
		document.removeEventListener(`${targetKey}Dropped`, onDrop);
	};

	handleMouseDown = e => {
		if (usesLeftButton(e) && !this.props.noDragging) {
			document.addEventListener('mousemove', this.handleMouseMove);
			document.addEventListener('mouseup', this.handleMouseUp);
			this.startDrag(e.clientX, e.clientY);
		}
	};

	startDrag = (clickX, clickY) => {
		const { targetKey, onDrop, onDragStart, dragData } = this.props;

		document.addEventListener(`${targetKey}Dropped`, onDrop);

		this.setState({
			clicked: true,
			leftOffset: 5,
			topOffset: 15,
			left: clickX,
			top: clickY,
		});

		onDragStart(dragData);
	};

	handleMouseMove = e => {
		if (!this.props.noDragging && this.state.clicked) {
			e.preventDefault();

			this.drag(e.clientX, e.clientY);
		}
	};

	getOffscreenCoordinates = (x, y) => {
		// are we offscreen (or very close, anyway)? if so by how much?
		const leftEdge = 10;
		const rightEdge = window.innerWidth - 10;
		const topEdge = 10;
		const bottomEdge = window.innerHeight - 10;
		const xOff = x < leftEdge
			? x - leftEdge
			: x > rightEdge
				? x - rightEdge
				: 0;
		const yOff = y < topEdge
			? y - topEdge
			: y > bottomEdge
				? y - bottomEdge
				: 0;
		return yOff || xOff ? [xOff, yOff] : false;
	};

	drag = (x, y) => {
		const { xOnly, yOnly, dragData, onDrag } = this.props;

		this.generateEnterLeaveEvents(x, y);

		const stateChanges = { isDragging: true };
		const offScreen = this.getOffscreenCoordinates(x, y);

		if (!offScreen) {
			if (!yOnly)
				stateChanges.left = this.state.leftOffset + x;

			if (!xOnly)
				stateChanges.top = this.state.topOffset + y;
		}

		this.setState(stateChanges);
		onDrag(dragData, this.currentTarget, x, y);
	};

	handleMouseUp = e => {
		this.setState({ clicked: false });

		if (this.state.isDragging)
			this.drop(e.clientX, e.clientY);
	};

	drop = (x, y) => {
		const { dragData, onDragEnd } = this.props;

		this.generateDropEvent(x, y);

		this.removeListeners();

		this.setState({ isDragging: false }, () => {
			onDragEnd(dragData, this.currentTarget, x, y);
		});
	};

	getDisplayMode = () => {
		const { dragClone, customDragElement, disappearDraggedElement } = this.props;
		const { isDragging } = this.state;

		if (isDragging && !dragClone && !customDragElement) {
			if (disappearDraggedElement)
				return 'disappeared';

			return 'hidden';
		}
		return 'normal';
	};

	render() {
		const { render: propsRender, children, dragElemOpacity, customDragElement, zIndex } = this.props;
		const { top, left, isDragging } = this.state;
		const content = propsRender ? propsRender(this.state) : children;
		const displayMode = this.getDisplayMode();

		const ghostContent = customDragElement || content;
		const ghostStyles = {
			top,
			left,
			zIndex,
			position: 'fixed',
			opacity: dragElemOpacity,
			display: isDragging ? 'block' : 'none',
		};
		const ghost = (
			<div className='ddcontainerghost' style={ghostStyles} ref={this.setDragElemRef}>
				{ghostContent}
			</div>
		);

		const containerStyles = {
			position: displayMode === 'disappeared' ? 'absolute' : 'relative',
			display: 'inline-block',
		};
		const sourceElemStyles = {
			display: displayMode === 'disappeared' ? 'none' : 'inherit',
			visibility: displayMode === 'hidden' ? 'hidden' : 'inherit',
		};

		return (
			<div className='ddcontainer' style={containerStyles} ref={this.setContainerElemRef}>
				<span
					style={sourceElemStyles}
					ref={this.setSourceElemRef}
					className='ddcontainersource'
				>
					{content}
				</span>
				{ghost}
			</div>
		);
	}
}

DragDropContainer.propTypes = {
	children: PropTypes.node,

	// Determines what you can drop on
	targetKey: PropTypes.string,

	// If provided, we'll drag this instead of the actual object. Takes priority over dragClone if both are set
	customDragElement: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

	// Makes the dragged element completely disappear while dragging so that it takes up no space
	disappearDraggedElement: PropTypes.bool,

	// If true, then we will drag a clone of the object instead of the object itself. See also customDragElement
	dragClone: PropTypes.bool,

	// Ghost element will display with this opacity
	dragElemOpacity: PropTypes.number,

	// We will pass this data to the target when you drag or drop over it
	dragData: PropTypes.object,

	// If included, we'll only let you drag by grabbing elements with this className
	dragHandleClassName: PropTypes.string,

	// if true, then dragging is turned off
	noDragging: PropTypes.bool,

	// callbacks (optional):
	onDrop: PropTypes.func,
	onDrag: PropTypes.func,
	onDragEnd: PropTypes.func,
	onDragStart: PropTypes.func,

	// Enable a render prop
	render: PropTypes.func,

	// Constrain dragging to the x or y directions only
	xOnly: PropTypes.bool,
	yOnly: PropTypes.bool,

	// Defaults to 10 while dragging, but you can customize it
	zIndex: PropTypes.number,
};

DragDropContainer.defaultProps = {
	targetKey: 'ddc',
	children: null,
	customDragElement: null,
	disappearDraggedElement: false,
	dragClone: false,
	dragElemOpacity: 1,
	dragData: {},
	dragHandleClassName: '',
	onDragStart: () => {},
	onDrag: () => {},
	onDragEnd: () => {},
	onDrop: () => {},
	noDragging: false,
	render: null,
	xOnly: false,
	yOnly: false,
	zIndex: 10,
};

export default DragDropContainer;
