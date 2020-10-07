import React, { useEffect, createContext, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const Button = props => React.createElement("button", Object.assign({}, props));
const ButtonRow = ({
  position: _position = "right",
  id,
  children,
  style
}) => React.createElement("div", {
  id: id,
  style: {
    textAlign: _position,
    ...style
  }
}, children);
const Close = props => React.createElement(Button, Object.assign({}, props, {
  style: {
    position: "relative",
    fontSize: "32px",
    width: "32px",
    height: "32px",
    lineHeight: "32px",
    background: "none",
    border: "none",
    outlineOffset: "-6px",
    cursor: "pointer",
    padding: "unset",
    ...props.style
  },
  onClick: () => props.onClick()
}), React.createElement("div", {
  style: {
    position: "absolute",
    width: "32px",
    height: "32px",
    transform: "rotate(45deg)",
    borderRadius: "32px",
    top: "0px"
  }
}, "+"));

const Alert = ({
  children,
  id,
  dismiss,
  style
}) => React.createElement("div", {
  id: `hydra-alert-${id}`,
  style: {
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.23) 0px 1px 6px 2px",
    width: "350px",
    padding: "20px",
    paddingRight: "38px",
    marginBottom: "20px",
    ...style
  }
}, children, React.createElement(Close, {
  onClick: () => dismiss(),
  style: {
    position: "absolute",
    top: "13px",
    right: "7px",
    opacity: "0.4"
  }
}));

const randomString = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const {
  Consumer: C,
  Provider: P
} = React.createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      {
        const {
          alertId,
          message,
          style
        } = action;
        return { ...state,
          [alertId]: {
            message,
            style
          }
        };
      }

    case "REMOVE":
      {
        const {
          alertId
        } = action;
        const mutatedState = { ...state
        };
        delete mutatedState[alertId];
        return mutatedState;
      }

    default:
      return state;
  }
};

const AlertProvider = ({
  children,
  duration: _duration = 10000,
  position
}) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  const activate = o => {
    const {
      message,
      duration: d,
      style
    } = o;
    const alertId = randomString();
    const newAlertDuration = d || _duration;
    setTimeout(() => dispatch({
      type: "REMOVE",
      alertId
    }), newAlertDuration);
    dispatch({
      type: "ADD",
      message,
      style,
      alertId
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

  return React.createElement(P, {
    value: {
      isActive: false,
      activate
    }
  }, React.createElement("div", null, children), React.createElement("div", {
    id: "hydra-alert-drawer",
    style: {
      position: "fixed",
      margin: "20px",
      ...generateStyles(position)
    }
  }, Object.keys(state).map(alertKey => {
    const {
      message,
      style
    } = state[alertKey];
    return React.createElement(Alert, {
      key: alertKey,
      id: alertKey,
      dismiss: () => dispatch({
        type: "REMOVE",
        alertId: alertKey
      }),
      style: style
    }, message);
  })));
};

const Alerts = {
  Consumer: C,
  Provider: AlertProvider
};

const COLOR = {
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
  hexToRgb: hex => {
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
  asRGB: (color, id) => {
    const hex = COLOR[color][id];
    const result = COLOR.hexToRgb(hex);
    if (!result) throw new Error("reference error, bad COLOR");
    const {
      r,
      g,
      b
    } = result;
    return `${r}, ${g}, ${b}`;
  }
};

const NoBackground = ({
  children
}) => React.createElement("div", {
  id: "hydra-overlay-background-container-none",
  style: {
    width: "100%",
    height: "100%"
  }
}, children);
const DarkBackground = ({
  children,
  backgroundThreshold: _backgroundThreshold = 0.65
}) => React.createElement("div", {
  id: "hydra-overlay-background-container-darken",
  style: {
    width: "100%",
    height: "100%",
    backgroundColor: `rgba(${COLOR.asRGB("GRAY", "200")}, ${_backgroundThreshold})`
  }
}, children);
const BlurryBackground = ({
  children,
  backgroundThreshold: _backgroundThreshold2 = 0.45
}) => {
  useEffect(() => {
    const wrapper = document.getElementById("hydra-overlay-wrapper");

    if (wrapper) {
      wrapper.style.filter = `blur(${_backgroundThreshold2 * 10}px)`;
    }
  }, []);
  return React.createElement("div", {
    id: "hydra-overlay-background-container-blur",
    style: {
      width: "100%",
      height: "100%"
    }
  }, children);
};
const Background = props => {
  switch (props.backgroundType) {
    case "DARKEN":
      return React.createElement(DarkBackground, Object.assign({}, props));

    case "BLUR":
      return React.createElement(BlurryBackground, Object.assign({}, props));

    case "NONE":
      return React.createElement(NoBackground, Object.assign({}, props));

    default:
      return React.createElement(DarkBackground, Object.assign({}, props));
  }
};

const {
  Consumer: C$1,
  Provider: P$1
} = createContext(null);

const OverlayProvider = ({
  children,
  backgroundType,
  backgroundThreshold,
  componentMap
}) => {
  const [overlayState, setOverlayState] = useState({
    isActive: false
  });

  const activate = ({
    component
  }) => setOverlayState({
    component,
    isActive: true
  });

  const deactivate = () => setOverlayState({
    isActive: false
  });

  const {
    component,
    isActive
  } = overlayState;
  const Component = component && componentMap[component];
  return React.createElement(P$1, {
    value: {
      isActive,
      componentMap,
      backgroundType,
      backgroundThreshold,
      activate,
      deactivate
    }
  }, React.createElement("div", {
    id: "hydra-overlay-wrapper"
  }, children), React.createElement("div", {
    id: "hydra-overlay",
    style: {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: "100vw",
      height: "100vh",
      pointerEvents: isActive ? "initial" : "none"
    }
  }, isActive && React.createElement(Background, {
    backgroundType: backgroundType,
    backgroundThreshold: backgroundThreshold
  }, React.createElement(Component, null))));
};

const OverlayConsumer = C$1;
const Overlay = {
  Consumer: OverlayConsumer,
  Provider: OverlayProvider
};

const Header = ({
  id,
  headerText,
  onClick,
  style
}) => React.createElement("div", {
  id: id,
  style: {
    minHeight: "32px",
    position: "relative",
    ...style
  }
}, headerText && React.createElement("h3", {
  style: {
    margin: "unset",
    lineHeight: "32px"
  }
}, headerText), React.createElement(Close, {
  onClick: () => onClick(),
  style: {
    position: "absolute",
    top: "0px",
    right: "0px"
  },
  autoFocus: true
}));
const Body = ({
  children,
  id,
  style
}) => React.createElement("div", {
  id: id,
  style: {
    flex: 1,
    paddingTop: "16px",
    paddingBottom: "24px",
    ...style
  }
}, children);
const Footer = props => React.createElement(ButtonRow, Object.assign({}, props));

const ModalHeader = ({
  closeModal,
  ...rest
}) => React.createElement(Header, Object.assign({
  id: "hydra-modal-header",
  onClick: () => closeModal()
}, rest));
const ModalBody = props => React.createElement(Body, Object.assign({
  id: "hydra-modal-body"
}, props));
const ModalFooter = ({
  closeModal,
  style
}) => React.createElement(Footer, {
  id: "hydra-modal-footer",
  position: "right",
  style: style
}, React.createElement(Button, {
  onClick: () => closeModal()
}, "close"));
const ModalContainer = ({
  children,
  deactivate,
  headerText,
  styleOverrides,
  width: _width = 600,
  height: _height = 550,
  withHeader: _withHeader = true,
  Header: _Header = ModalHeader,
  Body: _Body = ModalBody,
  withFooter: _withFooter = true,
  Footer: _Footer = ModalFooter
}) => React.createElement("div", {
  id: "hydra-overlay-modal",
  style: {
    width: `${_width}px`,
    height: `${_height}px`,
    backgroundColor: "#fff",
    borderRadius: "2px",
    boxShadow: `0px 0px 8px 4px ${COLOR.GRAY[300]}`,
    position: "absolute",
    left: "50%",
    marginLeft: `-${Math.floor(_width / 2)}px`,
    top: "16%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "14px 16px 24px 16px",
    ...(styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.container)
  }
}, _withHeader && React.createElement(_Header, {
  closeModal: deactivate,
  headerText: headerText,
  style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.header
}), React.createElement(_Body, {
  style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.body
}, children), _withFooter && React.createElement(_Footer, {
  closeModal: deactivate,
  style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.footer
}));
const Modal = props => React.createElement(Overlay.Consumer, null, context => {
  if (!context) return null;
  const {
    Container = ModalContainer
  } = props;
  return React.createElement(Container, Object.assign({}, props, context));
});

let _ = t => t,
    _t2;
const slideLeft = translateX => keyframes(_t2 || (_t2 = _`
  to { 
    transform: translateX(${0}px);
  }
`), translateX);

let _$1 = t => t,
    _t,
    _t2$1,
    _t3;
const PanelHeader = ({
  closePanel,
  ...rest
}) => React.createElement(Header, Object.assign({
  id: "hydra-panel-header",
  onClick: () => closePanel()
}, rest));
const PanelFooter = ({
  closePanel,
  style
}) => React.createElement(Footer, {
  id: "hydra-panel-footer",
  position: "right",
  style: style
}, React.createElement(Button, {
  onClick: () => closePanel()
}, "Close"));
const PanelBody = props => React.createElement(Body, Object.assign({
  id: "hydra-panel-body"
}, props));

const slideInMixin = () => css(_t || (_t = _$1`
  right: -600px;
  animation: ${0} 250ms ease-out forwards;
`), slideLeft(-600));

const slideOutMixin = () => css(_t2$1 || (_t2$1 = _$1`
  right: 0px;
  animation: ${0} 250ms ease-out forwards;
`), slideLeft(600));

const PanelWrapper = styled.div(_t3 || (_t3 = _$1`
  ${0}
`), props => props.isOpen ? slideInMixin : slideOutMixin);
const PanelContainer = ({
  children,
  styleOverrides,
  width: _width = "600px",
  height: _height = "100%",
  withHeader: _withHeader = true,
  headerText,
  Header: _Header = PanelHeader,
  Body: _Body = PanelBody,
  withFooter: _withFooter = true,
  Footer: _Footer = PanelFooter,
  deactivate
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return React.createElement(PanelWrapper, {
    id: "hydra-overlay-panel",
    isOpen: isOpen,
    style: {
      width: _width,
      height: _height,
      position: "fixed",
      top: "0px",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      padding: "14px 16px 24px 16px",
      overflow: "auto",
      wordBreak: "break-word",
      ...(styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.container)
    }
  }, _withHeader && React.createElement(_Header, {
    headerText: headerText,
    style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.header,
    closePanel: () => deactivate()
  }), React.createElement(_Body, {
    style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.body
  }, children), _withFooter && React.createElement(_Footer, {
    closePanel: () => {
      setIsOpen(false);
      setTimeout(() => deactivate(), 250);
    },
    style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.footer
  }));
};
const Panel = props => React.createElement(Overlay.Consumer, null, context => {
  if (!context) return null;
  const {
    Container = PanelContainer,
    ...rest
  } = props;
  return React.createElement(Container, Object.assign({}, rest, context));
});

export { Alert, Alerts, Background, BlurryBackground, Button, ButtonRow, Close, DarkBackground, Modal, ModalBody, ModalContainer, ModalFooter, ModalHeader, NoBackground, Overlay, Panel, PanelBody, PanelContainer, PanelFooter, PanelHeader };
//# sourceMappingURL=index.modern.js.map
