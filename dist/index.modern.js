import React, { useEffect, createContext, useState } from 'react';

function Alert(props) {
  const {
    message
  } = props;
  return alert(message);
}

const Button = props => {
  const {
    children,
    ...rest
  } = props;
  return React.createElement("button", Object.assign({}, rest), children);
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

var BACKGROUND_TYPE;

(function (BACKGROUND_TYPE) {
  BACKGROUND_TYPE["NONE"] = "NONE";
  BACKGROUND_TYPE["DARKEN"] = "DARKEN";
  BACKGROUND_TYPE["BLUR"] = "BLUR";
})(BACKGROUND_TYPE || (BACKGROUND_TYPE = {}));

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
    case BACKGROUND_TYPE.DARKEN:
      return React.createElement(DarkBackground, Object.assign({}, props));

    case BACKGROUND_TYPE.BLUR:
      return React.createElement(BlurryBackground, Object.assign({}, props));

    case BACKGROUND_TYPE.NONE:
      return React.createElement(NoBackground, Object.assign({}, props));

    default:
      return React.createElement(DarkBackground, Object.assign({}, props));
  }
};

const {
  Consumer: C,
  Provider: P
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
  return React.createElement(P, {
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

const OverlayConsumer = C;
const Overlay = {
  Consumer: OverlayConsumer,
  Provider: OverlayProvider
};

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
const ModalHeader = ({
  headerText,
  closeModal,
  style
}) => React.createElement("div", {
  id: "hydra-modal-header",
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
  onClick: () => closeModal(),
  style: {
    position: "absolute",
    top: "0px",
    right: "0px"
  },
  autoFocus: true
}));
const ModalBody = ({
  children,
  style
}) => React.createElement("div", {
  id: "hydra-modal-body",
  style: {
    flex: 1,
    ...style
  }
}, children);
const ModalFooter = ({
  closeModal
}) => React.createElement("div", null, React.createElement("button", {
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
  headerText: headerText
}), React.createElement(_Body, {
  style: styleOverrides === null || styleOverrides === void 0 ? void 0 : styleOverrides.body
}, children), _withFooter && React.createElement(_Footer, {
  closeModal: deactivate
}));
const Modal = props => React.createElement(Overlay.Consumer, null, context => {
  if (!context) return null;
  const {
    Container = ModalContainer
  } = props;
  return React.createElement(Container, Object.assign({}, props, context));
});

export { Alert, BACKGROUND_TYPE, Background, BlurryBackground, Button, Close, DarkBackground, Modal, ModalBody, ModalContainer, ModalFooter, ModalHeader, NoBackground, Overlay };
//# sourceMappingURL=index.modern.js.map
