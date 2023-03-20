(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.USAState = mod.exports;
  }
})(this, function (exports, _react) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var USAState = function USAState(props) {
    return _react2.default.createElement(
      "path",
      { d: props.dimensions, fill: props.fill, "data-name": props.state, className: props.state + " state", onClick: props.onClickState },
      _react2.default.createElement(
        "title",
        null,
        props.stateName
      )
    );
  };
  exports.default = USAState;
});