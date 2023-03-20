(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "prop-types", "./data/usa-map-dimensions", "./components/USAState"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("prop-types"), require("./data/usa-map-dimensions"), require("./components/USAState"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.usaMapDimensions, global.USAState);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _usaMapDimensions, _USAState) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _usaMapDimensions2 = _interopRequireDefault(_usaMapDimensions);

  var _USAState2 = _interopRequireDefault(_USAState);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var USAMap = function (_React$Component) {
    _inherits(USAMap, _React$Component);

    function USAMap() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, USAMap);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = USAMap.__proto__ || Object.getPrototypeOf(USAMap)).call.apply(_ref, [this].concat(args))), _this), _this.clickHandler = function (stateAbbreviation) {
        _this.props.onClick(stateAbbreviation);
      }, _this.fillStateColor = function (state) {
        if (_this.props.customize && _this.props.customize[state] && _this.props.customize[state].fill) {
          return _this.props.customize[state].fill;
        }

        return _this.props.defaultFill;
      }, _this.stateClickHandler = function (state) {
        if (_this.props.customize && _this.props.customize[state] && _this.props.customize[state].clickHandler) {
          return _this.props.customize[state].clickHandler;
        }
        return _this.clickHandler;
      }, _this.buildPaths = function () {
        var paths = [];
        var dataStates = (0, _usaMapDimensions2.default)();
        for (var stateKey in dataStates) {
          var path = _react2.default.createElement(_USAState2.default, { key: stateKey, stateName: dataStates[stateKey].name, dimensions: dataStates[stateKey]["dimensions"], state: stateKey, fill: _this.fillStateColor(stateKey), onClickState: _this.stateClickHandler(stateKey) });
          paths.push(path);
        };
        return paths;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(USAMap, [{
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          "svg",
          { className: "us-state-map", xmlns: "http://www.w3.org/2000/svg", width: this.props.width, height: this.props.height, viewBox: "0 0 959 593" },
          _react2.default.createElement(
            "title",
            null,
            this.props.title
          ),
          _react2.default.createElement(
            "g",
            { className: "outlines" },
            this.buildPaths(),
            _react2.default.createElement(
              "g",
              { className: "DC state" },
              _react2.default.createElement("path", { className: "DC1", fill: this.fillStateColor("DC1"), d: "M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z" }),
              _react2.default.createElement("circle", { className: "DC2", onClick: this.clickHandler, "data-name": "DC", fill: this.fillStateColor("DC2"), stroke: "#FFFFFF", strokeWidth: "1.5", cx: "801.3", cy: "251.8", r: "5", opacity: "1" })
            )
          )
        );
      }
    }]);

    return USAMap;
  }(_react2.default.Component);

  USAMap.propTypes = {
    onClick: _propTypes2.default.func.isRequired,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    title: _propTypes2.default.string,
    defaultFill: _propTypes2.default.string,
    customize: _propTypes2.default.object
  };

  USAMap.defaultProps = {
    onClick: function onClick() {},
    width: 959,
    height: 593,
    defaultFill: "#D3D3D3",
    title: "Blank US states map",
    customize: {}
  };

  exports.default = USAMap;
});