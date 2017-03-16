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

var _react = require('react');

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