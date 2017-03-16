(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DragDropContainer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _DragDropGhost = require('./DragDropGhost');

var _DragDropGhost2 = _interopRequireDefault(_DragDropGhost);

var _DropTarget = require('./DropTarget');

var _DropTarget2 = _interopRequireDefault(_DropTarget);

var DragDropContainer = (function (_React$Component) {
  _inherits(DragDropContainer, _React$Component);

  function DragDropContainer(props) {
    _classCallCheck(this, DragDropContainer);

    _get(Object.getPrototypeOf(DragDropContainer.prototype), 'constructor', this).call(this, props);
    this.state = {
      'clickX': 0,
      'clickY': 0,
      'left': 0,
      'top': 0,
      'initialLeftOffset': 0,
      'initialTopOffset': 0,
      'clicked': false,
      'dragging': false,
      'dragged': false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.startDrag = this.startDrag.bind(this);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.drag = this.drag.bind(this);

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.drop = this.drop.bind(this);

    this.checkForOffsetChanges = this.checkForOffsetChanges.bind(this);
    this.getChildrenWithDraggableFalse = this.getChildrenWithDraggableFalse.bind(this);

    // The DOM elem we're dragging, and the elements we're dragging over.
    // Changes to these do not trigger a re-render and so don't need to go in state
    this.dragElem = null;
    this.containerElem = null;
    this.currentTarget = null;
    this.prevTarget = null;
  }

  _createClass(DragDropContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.containerElem = this.refs['drag_container'];
      // figure out what we're going to drag
      if (this.props.dragGhost) {
        this.dragElem = this.refs['drag_ghost'].refs['the_ghost'];
      } else {
        this.dragElem = this.containerElem;
      }
      // capture events
      if (this.props.dragHandleClassName) {
        var elems = this.containerElem.getElementsByClassName(this.props.dragHandleClassName);
        for (var i = 0; i < elems.length; i++) {
          this.addListeners(elems[i]);
        }
      } else {
        this.addListeners(this.containerElem);
      }
    }
  }, {
    key: 'addListeners',
    value: function addListeners(elem) {
      var _this = this;

      elem.addEventListener('mousedown', function (e) {
        _this.handleMouseDown(e);
      }, false);
      elem.addEventListener('touchstart', function (e) {
        _this.handleTouchStart(e);
      }, false);
    }
  }, {
    key: 'createEvent',
    value: function createEvent(eventName, x, y) {
      var e = undefined;
      if (typeof window.CustomEvent !== 'function') {
        // we are in IE 11 and must use old-style method of creating event
        e = document.createEvent('CustomEvent');
        e.initCustomEvent(eventName, true, true, {});
      } else {
        e = new CustomEvent(eventName, { 'bubbles': true, 'cancelable': true });
      }
      // Add useful data to the event
      _extends(e, {
        dragData: this.props.dragData,
        dragElem: this.dragElem,
        sourceElem: this.containerElem
      });
      return e;
    }
  }, {
    key: 'setCurrentTarget',
    value: function setCurrentTarget(x, y) {
      // drop the z-index to get this elem out of the way, figure out what we're dragging over, then reset the z index
      this.dragElem.style.zIndex = -1;
      var target = document.elementFromPoint(x, y) || document.body;
      this.dragElem.style.zIndex = this.props.zIndex;
      // prevent it from selecting itself as the target
      this.currentTarget = this.dragElem.contains(target) ? document.body : target;
    }
  }, {
    key: 'generateEnterLeaveEvents',
    value: function generateEnterLeaveEvents(x, y) {
      // generate events as we enter and leave elements while dragging
      var prefix = this.props.targetKey;
      this.setCurrentTarget(x, y);
      if (this.currentTarget !== this.prevTarget) {
        if (this.prevTarget) {
          this.prevTarget.dispatchEvent(this.createEvent(prefix + 'DragLeave', x, y));
        }
        if (this.currentTarget) {
          this.currentTarget.dispatchEvent(this.createEvent(prefix + 'DragEnter', x, y));
        }
      }
      this.prevTarget = this.currentTarget;
    }
  }, {
    key: 'generateDropEvent',
    value: function generateDropEvent(x, y) {
      // generate a drop event in whatever we're currently dragging over
      this.setCurrentTarget(x, y);
      this.currentTarget.dispatchEvent(this.createEvent(this.props.targetKey + 'Drop', x, y));
    }

    // Start the Drag
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      if (e.buttons === 1 && !this.props.noDragging) {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        this.startDrag(e.clientX, e.clientY);
      }
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      if (!this.props.noDragging) {
        e.preventDefault();
        document.addEventListener('touchmove', this.handleTouchMove);
        document.addEventListener('touchend', this.handleTouchEnd);
        this.startDrag(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
      }
    }
  }, {
    key: 'startDrag',
    value: function startDrag(x, y) {
      document.addEventListener(this.props.targetKey + 'Dropped', this.props.onDropped);
      this.setState({
        clicked: true,
        clickX: x - this.state.left,
        clickY: y - this.state.top,
        initialLeftOffset: this.state.dragged ? this.state.initialLeftOffset : this.containerElem.offsetLeft,
        initialTopOffset: this.state.dragged ? this.state.initialTopOffset : this.containerElem.offsetTop
      });
      this.props.onStartDrag(this.props.dragData);
    }

    // During Drag
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      if (!this.props.noDragging) {
        e.preventDefault();
        if (this.state.clicked) {
          this.drag(e.clientX, e.clientY);
        }
      }
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      if (!this.props.noDragging) {
        e.preventDefault();
        if (this.state.clicked) {
          this.drag(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
        }
      }
    }
  }, {
    key: 'drag',
    value: function drag(x, y) {
      // drop the z-index, figure out what element we're dragging over, then reset the z index
      this.generateEnterLeaveEvents(x, y);

      var _checkForOffsetChanges = this.checkForOffsetChanges();

      var _checkForOffsetChanges2 = _slicedToArray(_checkForOffsetChanges, 2);

      var dx = _checkForOffsetChanges2[0];
      var dy = _checkForOffsetChanges2[1];

      var stateChanges = { dragging: true };
      if (!this.props.yOnly) {
        stateChanges['left'] = dx + x - this.state.clickX;
      }
      if (!this.props.xOnly) {
        stateChanges['top'] = dy + y - this.state.clickY;
      }
      this.setState(stateChanges);
      this.props.onDragging(this.props.dragData, this.currentTarget, x, y);
    }

    // Drop
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      this.setState({ clicked: false });
      if (this.state.dragging) {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        this.drop(e.clientX, e.clientY);
      }
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      this.setState({ clicked: false });
      if (this.state.dragging) {
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
        this.drop(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
      }
    }
  }, {
    key: 'drop',
    value: function drop(x, y) {
      // document.removeEventListener(`${this.props.targetKey}Dropped`, this.handleDrop);
      this.generateDropEvent(x, y);
      if (this.props.returnToBase) {
        this.setState({ left: 0, top: 0, dragging: false });
      } else {
        this.setState({ dragged: true, dragging: false });
      }
      this.props.onEndDrag(this.props.dragData, this.currentTarget, x, y);
    }
  }, {
    key: 'checkForOffsetChanges',
    value: function checkForOffsetChanges() {
      // deltas for when the system moves, e.g. from other elements on the page that change size on dragover.
      var dx = undefined,
          dy = undefined;
      if (this.props.dragGhost) {
        dx = this.state.initialLeftOffset - this.containerElem.offsetLeft;
        dy = this.state.initialTopOffset - this.containerElem.offsetTop;
      } else {
        dx = this.state.initialLeftOffset + this.state.left - this.containerElem.offsetLeft;
        dy = this.state.initialTopOffset + this.state.top - this.containerElem.offsetTop;
      }
      return [dx, dy];
    }
  }, {
    key: 'getChildrenWithDraggableFalse',
    value: function getChildrenWithDraggableFalse() {
      // because otherwise can conflict with built-in browser dragging behavior
      var inputReactObject = _react2['default'].Children.only(this.props.children);
      var clonedChild = _react2['default'].cloneElement(inputReactObject, {
        draggable: "false"
      });
      return clonedChild;
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = {
        'position': 'relative'
      };

      var ghost = '';
      if (this.props.dragGhost) {
        // dragging will be applied to the "ghost" element
        ghost = _react2['default'].createElement(
          _DragDropGhost2['default'],
          { dragging: this.state.dragging, left: this.state.left, top: this.state.top, zIndex: this.props.zIndex, ref: 'drag_ghost' },
          this.props.dragGhost
        );
      } else {
        // dragging will be applied to the DragDropContainer itself
        styles['left'] = this.state.left;
        styles['top'] = this.state.top;
        styles['zIndex'] = this.state.dragging || this.state.dragged ? this.props.zIndex : 'inherit';
      }
      return _react2['default'].createElement(
        'div',
        { style: styles, ref: 'drag_container' },
        this.getChildrenWithDraggableFalse(),
        ghost
      );
    }
  }]);

  return DragDropContainer;
})(_react2['default'].Component);

DragDropContainer.propTypes = {
  children: _react2['default'].PropTypes.any.isRequired,

  // Determines what you can drop on
  targetKey: _react2['default'].PropTypes.string,

  // We will pass this to the target when you drag or drop over it
  dragData: _react2['default'].PropTypes.object,

  // If provided, we'll drag this instead of the actual object
  dragGhost: _react2['default'].PropTypes.node,

  // If included, we'll only let you drag by grabbing the draghandle
  dragHandleClassName: _react2['default'].PropTypes.string,

  // if True, then dragging is turned off
  noDragging: _react2['default'].PropTypes.bool,

  // callbacks (optional):
  onDropped: _react2['default'].PropTypes.func,
  onDragging: _react2['default'].PropTypes.func,
  onEndDrag: _react2['default'].PropTypes.func,
  onStartDrag: _react2['default'].PropTypes.func,

  // If true, then object will return to its starting point after you let go of it
  returnToBase: _react2['default'].PropTypes.bool,

  // Constrain dragging to the x or y directions only
  xOnly: _react2['default'].PropTypes.bool,
  yOnly: _react2['default'].PropTypes.bool,

  // Defaults to 1000 while dragging, but you can customize it
  zIndex: _react2['default'].PropTypes.number
};

DragDropContainer.defaultProps = {
  targetKey: 'ddc',
  dragData: {},
  dragGhost: null,
  dragHandleClassName: '',
  onStartDrag: function onStartDrag() {},
  onDragging: function onDragging() {},
  onEndDrag: function onEndDrag() {},
  onDropped: function onDropped() {},
  noDragging: false,
  returnToBase: false,
  xOnly: false,
  yOnly: false,
  zIndex: 1000
};

exports.DragDropContainer = DragDropContainer;
exports.DropTarget = _DropTarget2['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./DragDropGhost":2,"./DropTarget":3}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

/**
 * Optional "ghost" node for dragging with DragDropContainer
 */

var DragDropGhost = (function (_React$Component) {
  _inherits(DragDropGhost, _React$Component);

  function DragDropGhost() {
    _classCallCheck(this, DragDropGhost);

    _get(Object.getPrototypeOf(DragDropGhost.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DragDropGhost, [{
    key: 'render',
    value: function render() {
      var styles = {
        'position': 'absolute',
        'zIndex': this.props.zIndex,
        'left': this.props.left,
        'top': this.props.top,
        'display': this.props.dragging ? 'block' : 'none'
      };
      return _react2['default'].createElement(
        'div',
        { style: styles, ref: 'the_ghost' },
        this.props.children
      );
    }
  }]);

  return DragDropGhost;
})(_react2['default'].Component);

DragDropGhost.propTypes = {
  children: _react2['default'].PropTypes.any,
  display: _react2['default'].PropTypes.string,
  dragging: _react2['default'].PropTypes.bool,
  left: _react2['default'].PropTypes.number,
  top: _react2['default'].PropTypes.number,
  zIndex: _react2['default'].PropTypes.number
};

exports['default'] = DragDropGhost;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var DropTarget = (function (_React$Component) {
  _inherits(DropTarget, _React$Component);

  function DropTarget(props) {
    _classCallCheck(this, DropTarget);

    _get(Object.getPrototypeOf(DropTarget.prototype), 'constructor', this).call(this, props);
    this.elem = null;
    this.handleDrop = this.handleDrop.bind(this);
  }

  _createClass(DropTarget, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this.elem = this.refs.drop_target;
      this.elem.addEventListener(this.props.targetKey + 'DragEnter', function (e) {
        _this.props.onDragEnter(e);
      }, false);
      this.elem.addEventListener(this.props.targetKey + 'DragLeave', function (e) {
        _this.props.onDragLeave(e);
      }, false);
      this.elem.addEventListener(this.props.targetKey + 'Drop', function (e) {
        _this.handleDrop(e);
      }, false);
    }
  }, {
    key: 'createEvent',
    value: function createEvent(eventName, eventData) {
      // utility to create an event
      var e = undefined;
      if (typeof window.CustomEvent !== 'function') {
        // we are in IE 11 and must use old-style method of creating event
        e = document.createEvent('CustomEvent');
        e.initCustomEvent(eventName, true, true, {});
      } else {
        e = new CustomEvent(eventName, { 'bubbles': true, 'cancelable': true });
      }
      _extends(e, eventData);
      return e;
    }
  }, {
    key: 'handleDrop',
    value: function handleDrop(e) {
      // tell the drop source about the drop, then do the callback
      var evt = this.createEvent(this.props.targetKey + 'Dropped', { dropElem: this.elem, dropData: this.props.dropData });
      e.sourceElem.dispatchEvent(evt);
      this.props.onDrop(e);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { ref: 'drop_target', style: _extends({ display: 'inline-block' }, this.props.style) },
        this.props.children
      );
    }
  }]);

  return DropTarget;
})(_react2['default'].Component);

DropTarget.propTypes = {
  children: _react2['default'].PropTypes.any.isRequired,
  targetKey: _react2['default'].PropTypes.string,
  onDragEnter: _react2['default'].PropTypes.func,
  onDragLeave: _react2['default'].PropTypes.func,
  onDrop: _react2['default'].PropTypes.func,
  dropData: _react2['default'].PropTypes.object,
  style: _react2['default'].PropTypes.object
};

DropTarget.defaultProps = {
  targetKey: 'ddc',
  onDragEnter: function onDragEnter() {
    console.log('drag enter');
  },
  onDragLeave: function onDragLeave() {
    console.log('drag leave');
  },
  onDrop: function onDrop() {
    console.log('dropped!');
  },
  dropData: {},
  style: {}
};

exports['default'] = DropTarget;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});