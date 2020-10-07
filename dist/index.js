function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styled = require('styled-components');
var styled__default = _interopDefault(styled);

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

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var Button = function Button(props) {
  return React__default.createElement("button", Object.assign({}, props));
};
var ButtonRow = function ButtonRow(_ref) {
  var _ref$position = _ref.position,
      position = _ref$position === void 0 ? "right" : _ref$position,
      id = _ref.id,
      children = _ref.children,
      style = _ref.style;
  return React__default.createElement("div", {
    id: id,
    style: _extends({
      textAlign: position
    }, style)
  }, children);
};
var Close = function Close(props) {
  return React__default.createElement(Button, Object.assign({}, props, {
    style: _extends({
      position: "relative",
      fontSize: "32px",
      width: "32px",
      height: "32px",
      lineHeight: "32px",
      background: "none",
      border: "none",
      outlineOffset: "-6px",
      cursor: "pointer",
      padding: "unset"
    }, props.style),
    onClick: function onClick() {
      return props.onClick();
    }
  }), React__default.createElement("div", {
    style: {
      position: "absolute",
      width: "32px",
      height: "32px",
      transform: "rotate(45deg)",
      borderRadius: "32px",
      top: "0px"
    }
  }, "+"));
};

var Alert = function Alert(_ref) {
  var children = _ref.children,
      id = _ref.id,
      dismiss = _ref.dismiss,
      style = _ref.style;
  return React__default.createElement("div", {
    id: "hydra-alert-" + id,
    style: _extends({
      position: "relative",
      boxShadow: "rgba(0, 0, 0, 0.23) 0px 1px 6px 2px",
      width: "350px",
      padding: "20px",
      paddingRight: "38px",
      marginBottom: "20px"
    }, style)
  }, children, React__default.createElement(Close, {
    onClick: function onClick() {
      return dismiss();
    },
    style: {
      position: "absolute",
      top: "13px",
      right: "7px",
      opacity: "0.4"
    }
  }));
};

var randomString = function randomString() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

var _React$createContext = React__default.createContext(null),
    C = _React$createContext.Consumer,
    P = _React$createContext.Provider;

var reducer = function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      {
        var _extends2;

        var alertId = action.alertId,
            message = action.message,
            style = action.style;
        return _extends({}, state, (_extends2 = {}, _extends2[alertId] = {
          message: message,
          style: style
        }, _extends2));
      }

    case "REMOVE":
      {
        var _alertId = action.alertId;

        var mutatedState = _extends({}, state);

        delete mutatedState[_alertId];
        return mutatedState;
      }

    default:
      return state;
  }
};

var AlertProvider = function AlertProvider(_ref2) {
  var children = _ref2.children,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === void 0 ? 10000 : _ref2$duration,
      position = _ref2.position;

  var _React$useReducer = React__default.useReducer(reducer, {}),
      state = _React$useReducer[0],
      dispatch = _React$useReducer[1];

  var activate = function activate(o) {
    var message = o.message,
        d = o.duration,
        style = o.style;
    var alertId = randomString();
    var newAlertDuration = d || duration;
    setTimeout(function () {
      return dispatch({
        type: "REMOVE",
        alertId: alertId
      });
    }, newAlertDuration);
    dispatch({
      type: "ADD",
      message: message,
      style: style,
      alertId: alertId
    });
  };

  function generateStyles(position) {
    switch (position) {
      case "BOTTOM_LEFT":
        return {
          left: "0px",
          bottom: "0px"
        };

      case "TOP":
      default:
        return {
          top: "0px",
          left: "calc(50% - 194px)"
        };
    }
  }

  return React__default.createElement(P, {
    value: {
      isActive: false,
      activate: activate
    }
  }, React__default.createElement("div", null, children), React__default.createElement("div", {
    id: "hydra-alert-drawer",
    style: _extends({
      position: "fixed",
      margin: "20px"
    }, generateStyles(position))
  }, Object.keys(state).map(function (alertKey) {
    var _state$alertKey = state[alertKey],
        message = _state$alertKey.message,
        style = _state$alertKey.style;
    return React__default.createElement(Alert, {
      key: alertKey,
      id: alertKey,
      dismiss: function dismiss() {
        return dispatch({
          type: "REMOVE",
          alertId: alertKey
        });
      },
      style: style
    }, message);
  })));
};

var Alerts = {
  Consumer: C,
  Provider: AlertProvider
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
    case "DARKEN":
      return React__default.createElement(DarkBackground, Object.assign({}, props));

    case "BLUR":
      return React__default.createElement(BlurryBackground, Object.assign({}, props));

    case "NONE":
      return React__default.createElement(NoBackground, Object.assign({}, props));

    default:
      return React__default.createElement(DarkBackground, Object.assign({}, props));
  }
};

var _createContext = React.createContext(null),
    C$1 = _createContext.Consumer,
    P$1 = _createContext.Provider;

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
  return React__default.createElement(P$1, {
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

var OverlayConsumer = C$1;
var Overlay = {
  Consumer: OverlayConsumer,
  Provider: OverlayProvider
};

var Header = function Header(_ref) {
  var id = _ref.id,
      headerText = _ref.headerText,
      _onClick = _ref.onClick,
      style = _ref.style;
  return React__default.createElement("div", {
    id: id,
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
    onClick: function onClick() {
      return _onClick();
    },
    style: {
      position: "absolute",
      top: "0px",
      right: "0px"
    },
    autoFocus: true
  }));
};
var Body = function Body(_ref2) {
  var children = _ref2.children,
      id = _ref2.id,
      style = _ref2.style;
  return React__default.createElement("div", {
    id: id,
    style: _extends({
      flex: 1,
      paddingTop: "16px",
      paddingBottom: "24px"
    }, style)
  }, children);
};
var Footer = function Footer(props) {
  return React__default.createElement(ButtonRow, Object.assign({}, props));
};

var ModalHeader = function ModalHeader(_ref) {
  var closeModal = _ref.closeModal,
      rest = _objectWithoutPropertiesLoose(_ref, ["closeModal"]);

  return React__default.createElement(Header, Object.assign({
    id: "hydra-modal-header",
    onClick: function onClick() {
      return closeModal();
    }
  }, rest));
};
var ModalBody = function ModalBody(props) {
  return React__default.createElement(Body, Object.assign({
    id: "hydra-modal-body"
  }, props));
};
var ModalFooter = function ModalFooter(_ref2) {
  var closeModal = _ref2.closeModal,
      style = _ref2.style;
  return React__default.createElement(Footer, {
    id: "hydra-modal-footer",
    position: "right",
    style: style
  }, React__default.createElement(Button, {
    onClick: function onClick() {
      return closeModal();
    }
  }, "close"));
};
var ModalContainer = function ModalContainer(_ref3) {
  var children = _ref3.children,
      deactivate = _ref3.deactivate,
      headerText = _ref3.headerText,
      styleOverrides = _ref3.styleOverrides,
      _ref3$width = _ref3.width,
      width = _ref3$width === void 0 ? 600 : _ref3$width,
      _ref3$height = _ref3.height,
      height = _ref3$height === void 0 ? 550 : _ref3$height,
      _ref3$withHeader = _ref3.withHeader,
      withHeader = _ref3$withHeader === void 0 ? true : _ref3$withHeader,
      _ref3$Header = _ref3.Header,
      Header = _ref3$Header === void 0 ? ModalHeader : _ref3$Header,
      _ref3$Body = _ref3.Body,
      Body = _ref3$Body === void 0 ? ModalBody : _ref3$Body,
      _ref3$withFooter = _ref3.withFooter,
      withFooter = _ref3$withFooter === void 0 ? true : _ref3$withFooter,
      _ref3$Footer = _ref3.Footer,
      Footer = _ref3$Footer === void 0 ? ModalFooter : _ref3$Footer;
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
    headerText: headerText,
    style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.header
  }), React__default.createElement(Body, {
    style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.body
  }, children), withFooter && React__default.createElement(Footer, {
    closeModal: deactivate,
    style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.footer
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

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  to { \n    transform: translateX(", "px);\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}
var slideLeft = function slideLeft(translateX) {
  return styled.keyframes(_templateObject2(), translateX);
};

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteralLoose(["\n  right: 0px;\n  animation: ", " 250ms ease-out forwards;\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  right: -600px;\n  animation: ", " 250ms ease-out forwards;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var PanelHeader = function PanelHeader(_ref) {
  var closePanel = _ref.closePanel,
      rest = _objectWithoutPropertiesLoose(_ref, ["closePanel"]);

  return React__default.createElement(Header, Object.assign({
    id: "hydra-panel-header",
    onClick: function onClick() {
      return closePanel();
    }
  }, rest));
};
var PanelFooter = function PanelFooter(_ref2) {
  var closePanel = _ref2.closePanel,
      style = _ref2.style;
  return React__default.createElement(Footer, {
    id: "hydra-panel-footer",
    position: "right",
    style: style
  }, React__default.createElement(Button, {
    onClick: function onClick() {
      return closePanel();
    }
  }, "Close"));
};
var PanelBody = function PanelBody(props) {
  return React__default.createElement(Body, Object.assign({
    id: "hydra-panel-body"
  }, props));
};

var slideInMixin = function slideInMixin() {
  return styled.css(_templateObject(), slideLeft(-600));
};

var slideOutMixin = function slideOutMixin() {
  return styled.css(_templateObject2$1(), slideLeft(600));
};

var PanelWrapper = styled__default.div(_templateObject3(), function (props) {
  return props.isOpen ? slideInMixin : slideOutMixin;
});
var PanelContainer = function PanelContainer(_ref3) {
  var children = _ref3.children,
      styleOverrides = _ref3.styleOverrides,
      _ref3$width = _ref3.width,
      width = _ref3$width === void 0 ? "600px" : _ref3$width,
      _ref3$height = _ref3.height,
      height = _ref3$height === void 0 ? "100%" : _ref3$height,
      _ref3$withHeader = _ref3.withHeader,
      withHeader = _ref3$withHeader === void 0 ? true : _ref3$withHeader,
      headerText = _ref3.headerText,
      _ref3$Header = _ref3.Header,
      Header = _ref3$Header === void 0 ? PanelHeader : _ref3$Header,
      _ref3$Body = _ref3.Body,
      Body = _ref3$Body === void 0 ? PanelBody : _ref3$Body,
      _ref3$withFooter = _ref3.withFooter,
      withFooter = _ref3$withFooter === void 0 ? true : _ref3$withFooter,
      _ref3$Footer = _ref3.Footer,
      Footer = _ref3$Footer === void 0 ? PanelFooter : _ref3$Footer,
      deactivate = _ref3.deactivate;

  var _useState = React.useState(true),
      isOpen = _useState[0],
      setIsOpen = _useState[1];

  return React__default.createElement(PanelWrapper, {
    id: "hydra-overlay-panel",
    isOpen: isOpen,
    style: _extends({
      width: width,
      height: height,
      position: "fixed",
      top: "0px",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      padding: "14px 16px 24px 16px",
      overflow: "auto",
      wordBreak: "break-word"
    }, styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.container)
  }, withHeader && React__default.createElement(Header, {
    headerText: headerText,
    style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.header,
    closePanel: function closePanel() {
      return deactivate();
    }
  }), React__default.createElement(Body, {
    style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.body
  }, children), withFooter && React__default.createElement(Footer, {
    closePanel: function closePanel() {
      setIsOpen(false);
      setTimeout(function () {
        return deactivate();
      }, 250);
    },
    style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.footer
  }));
};
var Panel = function Panel(props) {
  return React__default.createElement(Overlay.Consumer, null, function (context) {
    if (!context) return null;

    var _props$Container = props.Container,
        Container = _props$Container === void 0 ? PanelContainer : _props$Container,
        rest = _objectWithoutPropertiesLoose(props, ["Container"]);

    return React__default.createElement(Container, Object.assign({}, rest, context));
  });
};

exports.Alert = Alert;
exports.Alerts = Alerts;
exports.Background = Background;
exports.BlurryBackground = BlurryBackground;
exports.Button = Button;
exports.ButtonRow = ButtonRow;
exports.Close = Close;
exports.DarkBackground = DarkBackground;
exports.Modal = Modal;
exports.ModalBody = ModalBody;
exports.ModalContainer = ModalContainer;
exports.ModalFooter = ModalFooter;
exports.ModalHeader = ModalHeader;
exports.NoBackground = NoBackground;
exports.Overlay = Overlay;
exports.Panel = Panel;
exports.PanelBody = PanelBody;
exports.PanelContainer = PanelContainer;
exports.PanelFooter = PanelFooter;
exports.PanelHeader = PanelHeader;
//# sourceMappingURL=index.js.map
