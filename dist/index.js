function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function Alert(props) {
  var message = props.message;
  return alert(message);
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
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

  console.log("hello from hydra/packages/components");
  return React__default.createElement("button", Object.assign({}, rest), children);
};
var Close = function Close(_ref) {
  var close = _ref.close,
      style = _ref.style;
  return React__default.createElement("button", {
    style: _extends({
      fontSize: "32px",
      width: "32px",
      height: "32px",
      lineHeight: "32px",
      transform: "rotate(45deg)",
      borderRadius: "32px",
      background: "none",
      border: "none",
      outline: "none",
      cursor: "pointer",
      padding: "unset"
    }, style),
    onClick: function onClick() {
      return close();
    }
  }, "+");
};

var COLOR = {
  GRAY: {
    100: "#ffffff",
    200: "#f1f2f6",
    300: "#dfe4ea",
    400: "#ced6e0",
    500: "#a4b0be",
    600: "#747d8c",
    700: "#57606f",
    800: "#2f3542"
  },
  hexToRgb: function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },
  asRGB: function asRGB(color, id) {
    var hex = COLOR[color][id];
    var result = COLOR.hexToRgb(hex);
    if (!result) throw new Error("reference error, bad COLOR");
    var r = result.r,
        g = result.g,
        b = result.b;
    return r + ", " + g + ", " + b;
  }
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
      backgroundThreshold = _ref2$backgroundThres === void 0 ? 0.65 : _ref2$backgroundThres;
  return React__default.createElement("div", {
    id: "hydra-overlay-background-container-darken",
    style: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(" + COLOR.asRGB("GRAY", "200") + ", " + backgroundThreshold + ")"
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
      backgroundThreshold = _ref.backgroundThreshold,
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
  }, isActive && React__default.createElement(Background, {
    backgroundType: backgroundType,
    backgroundThreshold: backgroundThreshold
  }, React__default.createElement(Component, null))));
};

var OverlayConsumer = C;
var Overlay = {
  Consumer: OverlayConsumer,
  Provider: OverlayProvider
};

var ModalHeader = function ModalHeader(_ref) {
  var headerText = _ref.headerText,
      closeModal = _ref.closeModal,
      style = _ref.style;
  return React__default.createElement("div", {
    id: "hydra-modal-header",
    style: _extends({
      minHeight: "32px",
      position: "relative"
    }, style)
  }, headerText && React__default.createElement("h3", {
    style: {
      margin: "unset",
      lineHeight: "32px"
    }
  }, headerText), React__default.createElement(Close, {
    close: function close() {
      return closeModal();
    },
    style: {
      position: "absolute",
      top: "0px",
      right: "0px"
    }
  }));
};
var ModalBody = function ModalBody(_ref2) {
  var children = _ref2.children,
      style = _ref2.style;
  return React__default.createElement("div", {
    id: "hydra-modal-body",
    style: _extends({
      flex: 1
    }, style)
  }, children);
};
var ModalFooter = function ModalFooter(_ref3) {
  var closeModal = _ref3.closeModal;
  return React__default.createElement("div", null, React__default.createElement("button", {
    onClick: function onClick() {
      return closeModal();
    }
  }, "close"));
};
var ModalContainer = function ModalContainer(_ref4) {
  var children = _ref4.children,
      deactivate = _ref4.deactivate,
      headerText = _ref4.headerText,
      styleOverrides = _ref4.styleOverrides,
      _ref4$width = _ref4.width,
      width = _ref4$width === void 0 ? 600 : _ref4$width,
      _ref4$height = _ref4.height,
      height = _ref4$height === void 0 ? 550 : _ref4$height,
      _ref4$withHeader = _ref4.withHeader,
      withHeader = _ref4$withHeader === void 0 ? true : _ref4$withHeader,
      _ref4$Header = _ref4.Header,
      Header = _ref4$Header === void 0 ? ModalHeader : _ref4$Header,
      _ref4$Body = _ref4.Body,
      Body = _ref4$Body === void 0 ? ModalBody : _ref4$Body,
      _ref4$withFooter = _ref4.withFooter,
      withFooter = _ref4$withFooter === void 0 ? true : _ref4$withFooter,
      _ref4$Footer = _ref4.Footer,
      Footer = _ref4$Footer === void 0 ? ModalFooter : _ref4$Footer;
  return React__default.createElement("div", {
    id: "hydra-overlay-modal",
    style: _extends({
      width: width + "px",
      height: height + "px",
      backgroundColor: "#fff",
      borderRadius: "2px",
      boxShadow: "0px 0px 8px 4px " + COLOR.GRAY[300],
      position: "absolute",
      left: "50%",
      marginLeft: "-" + Math.floor(width / 2) + "px",
      top: "16%",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      padding: "14px 16px 24px 16px"
    }, styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.container)
  }, withHeader && React__default.createElement(Header, {
    closeModal: deactivate,
    headerText: headerText
  }), React__default.createElement(Body, {
    style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.body
  }, children), withFooter && React__default.createElement(Footer, {
    closeModal: deactivate
  }));
};
var Modal = function Modal(props) {
  return React__default.createElement(Overlay.Consumer, null, function (context) {
    if (!context) return null;
    var _props$Container = props.Container,
        Container = _props$Container === void 0 ? ModalContainer : _props$Container;
    return React__default.createElement(Container, Object.assign({}, props, context));
  });
};

exports.Alert = Alert;
exports.Background = Background;
exports.BlurryBackground = BlurryBackground;
exports.Button = Button;
exports.Close = Close;
exports.DarkBackground = DarkBackground;
exports.Modal = Modal;
exports.ModalBody = ModalBody;
exports.ModalContainer = ModalContainer;
exports.ModalFooter = ModalFooter;
exports.ModalHeader = ModalHeader;
exports.NoBackground = NoBackground;
exports.Overlay = Overlay;
//# sourceMappingURL=index.js.map
