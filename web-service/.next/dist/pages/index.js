'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noParser = require('styled-components/no-parser');

var _noParser2 = _interopRequireDefault(_noParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/juandc/Developer/Github/aerostore/web-service/pages/index.js?entry';


(0, _noParser.injectGlobal)([['body{background-color:#F9F9F9;}']]);

var Title = function Title(_ref) {
  var msg = _ref.msg,
      props = (0, _objectWithoutProperties3.default)(_ref, ['msg']);

  return _react2.default.createElement('div', (0, _extends3.default)({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), _react2.default.createElement('h1', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, 'The Message is: ', msg), _react2.default.createElement('p', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, 'PPPP'));
};

var StyledTitle = (0, _noParser2.default)(Title).withConfig({
  displayName: 'pages__StyledTitle',
  componentId: 's1hkzbsg-0'
})([['{color:red;font-size:30px;}'], [' h1{color:green;font-size:50px;}']]);

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home() {
    (0, _classCallCheck3.default)(this, Home);

    return (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).apply(this, arguments));
  }

  (0, _createClass3.default)(Home, [{
    key: 'render',
    value: function render() {
      var props = this.props;

      return _react2.default.createElement('section', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, _react2.default.createElement(StyledTitle, { msg: 'Random!', __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, 'Hello!'), new Date("2017-11-21T03:55:03.771Z").toLocaleString("en-us", {
        day: 'numeric',
        month: 'long',
        weekday: 'long'
      }));
    }
  }]);

  return Home;
}(_react.Component);

exports.default = Home;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbInN0eWxlZCIsImluamVjdEdsb2JhbCIsIkNvbXBvbmVudCIsIlRpdGxlIiwibXNnIiwicHJvcHMiLCJTdHlsZWRUaXRsZSIsIkhvbWUiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJkYXkiLCJtb250aCIsIndlZWtkYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFVLEFBQ2pCLEFBQVM7Ozs7Ozs7OztBQUdUOztBQU9BLElBQU0sUUFBUSxTQUFSLEFBQVEsWUFBQTtNQUFBLEFBQUcsV0FBSCxBQUFHO01BQUgsQUFBVyxzREFBWDs7eUJBQ1osY0FBQSxrQ0FBQSxBQUFTOztnQkFBVDtrQkFBQSxBQUNFO0FBREY7QUFBQSxJQUFBLGtCQUNFLGNBQUE7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQUFxQixvQkFEdkIsQUFDRSxBQUNBLHNCQUFBLGNBQUE7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQUhVLEFBQ1osQUFFRTtBQUhKOztBQU1BLElBQU0sc0NBQUEsQUFBYyxBQUFPO2VBQXJCO2VBQUE7QUFBQSxDQUFjLHFDQUFwQjs7SSxBQVNNOzs7Ozs7Ozs7Ozs2QkFDSyxBQUNQO1VBQU0sUUFBUSxLQUFkLEFBQW1CLEFBRW5COzs2QkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSxPQUFBLGtCQUNHLGNBQUQsZUFBYSxLQUFiLEFBQWlCO29CQUFqQjtzQkFBQTtBQUFBO1NBREYsQUFDRSxBQUVFLGVBQUEsQUFBSSxLQUFKLEFBQVMsNEJBQVQsQUFDRyxlQURILEFBQ2tCO2FBQVMsQUFDbEIsQUFDTDtlQUZ1QixBQUVoQixBQUNQO2lCQVJWLEFBQ0UsQUFHSSxBQUMyQixBQUdkLEFBS3BCO0FBUmtDLEFBQ3ZCOzs7OztBQVZLLEEsQUFxQm5COztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9ob21lL2p1YW5kYy9EZXZlbG9wZXIvR2l0aHViL2Flcm9zdG9yZS93ZWItc2VydmljZSJ9