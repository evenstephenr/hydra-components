function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function Alert(props) {
  var message = props.message;
  return alert(message);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var Button = function Button(props) {
  var children = props.children,
      rest = _objectWithoutPropertiesLoose(props, ["children"]);

  console.log('hello from hydra/packages/components');
  return React__default.createElement("button", Object.assign({}, rest), children);
};

(function (BACKGROUND_TYPE) {
  BACKGROUND_TYPE["NONE"] = "NONE";
  BACKGROUND_TYPE["DARKEN"] = "DARKEN";
  BACKGROUND_TYPE["BLUR"] = "BLUR";
})(exports.BACKGROUND_TYPE || (exports.BACKGROUND_TYPE = {}));

var NoBackground = function NoBackground(_ref) {
  var children = _ref.children;
  return React__default.createElement("div", {
    id: "hydra-overlay-background-container-none",
    style: {
      width: "100%",
      height: "100%"
    }
  }, children);
};
var DarkBackground = function DarkBackground(_ref2) {
  var children = _ref2.children,
      _ref2$backgroundThres = _ref2.backgroundThreshold,
      backgroundThreshold = _ref2$backgroundThres === void 0 ? 0.45 : _ref2$backgroundThres;
  return React__default.createElement("div", {
    id: "hydra-overlay-background-container-darken",
    style: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(140, 140, 140, " + backgroundThreshold + ")"
    }
  }, children);
};
var BlurryBackground = function BlurryBackground(_ref3) {
  var children = _ref3.children,
      _ref3$backgroundThres = _ref3.backgroundThreshold,
      backgroundThreshold = _ref3$backgroundThres === void 0 ? 0.45 : _ref3$backgroundThres;
  React.useEffect(function () {
    var wrapper = document.getElementById("hydra-overlay-wrapper");

    if (wrapper) {
      wrapper.style.filter = "blur(" + backgroundThreshold * 10 + "px)";
    }
  }, []);
  return React__default.createElement("div", {
    id: "hydra-overlay-background-container-blur",
    style: {
      width: "100%",
      height: "100%"
    }
  }, children);
};
var Background = function Background(props) {
  switch (props.backgroundType) {
    case exports.BACKGROUND_TYPE.DARKEN:
      return React__default.createElement(DarkBackground, Object.assign({}, props));

    case exports.BACKGROUND_TYPE.BLUR:
      return React__default.createElement(BlurryBackground, Object.assign({}, props));

    case exports.BACKGROUND_TYPE.NONE:
      return React__default.createElement(NoBackground, Object.assign({}, props));

    default:
      return React__default.createElement(DarkBackground, Object.assign({}, props));
  }
};

var _createContext = React.createContext(null),
    C = _createContext.Consumer,
    P = _createContext.Provider;

var OverlayProvider = function OverlayProvider(_ref) {
  var children = _ref.children,
      backgroundType = _ref.backgroundType,
      _ref$backgroundThresh = _ref.backgroundThreshold,
      backgroundThreshold = _ref$backgroundThresh === void 0 ? 0.45 : _ref$backgroundThresh,
      componentMap = _ref.componentMap;

  var _useState = React.useState({
    isActive: false
  }),
      overlayState = _useState[0],
      setOverlayState = _useState[1];

  var activate = function activate(_ref2) {
    var component = _ref2.component;
    return setOverlayState({
      component: component,
      isActive: true
    });
  };

  var deactivate = function deactivate() {
    return setOverlayState({
      isActive: false
    });
  };

  var component = overlayState.component,
      isActive = overlayState.isActive;
  var Component = component && componentMap[component];
  return React__default.createElement(P, {
    value: {
      isActive: isActive,
      componentMap: componentMap,
      backgroundType: backgroundType,
      backgroundThreshold: backgroundThreshold,
      activate: activate,
      deactivate: deactivate
    }
  }, React__default.createElement("div", {
    id: "hydra-overlay-wrapper"
  }, children), React__default.createElement("div", {
    id: "hydra-overlay",
    style: {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: "100vw",
      height: "100vh",
      pointerEvents: isActive ? "initial" : "none"
    }
  }, isActive && Component && React__default.createElement(Background, {
    backgroundType: backgroundType,
    backgroundThreshold: backgroundThreshold
  }, React__default.createElement("div", {
    id: "hydra-overlay-modal-container"
  }, React__default.createElement(Component, null)))));
};

var Overlay = {
  Consumer: C,
  Provider: OverlayProvider
};

exports.Alert = Alert;
exports.Background = Background;
exports.BlurryBackground = BlurryBackground;
exports.Button = Button;
exports.DarkBackground = DarkBackground;
exports.NoBackground = NoBackground;
exports.Overlay = Overlay;
//# sourceMappingURL=index.js.map
