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
  console.log('hello from hydra/packages/components');
  return React.createElement("button", Object.assign({}, rest), children);
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
  backgroundThreshold: _backgroundThreshold = 0.45
}) => React.createElement("div", {
  id: "hydra-overlay-background-container-darken",
  style: {
    width: "100%",
    height: "100%",
    backgroundColor: `rgba(140, 140, 140, ${_backgroundThreshold})`
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
  backgroundThreshold: _backgroundThreshold = 0.25,
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
      backgroundThreshold: _backgroundThreshold,
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
    backgroundThreshold: _backgroundThreshold
  }, React.createElement(Component, null))));
};

const OverlayConsumer = C;
const Overlay = {
  Consumer: OverlayConsumer,
  Provider: OverlayProvider
};

const ModalHeader = ({
  headerText,
  closeModal
}) => React.createElement("div", {
  id: "hydra-modal-header"
}, React.createElement("p", null, headerText), React.createElement("button", {
  onClick: () => closeModal()
}, "X"));
const ModalBody = ({
  children
}) => React.createElement("div", {
  id: "hydra-modal-body"
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
  withHeader: _withHeader = true,
  Header: _Header = ModalHeader,
  Body: _Body = ModalBody,
  withFooter: _withFooter = true,
  Footer: _Footer = ModalFooter
}) => React.createElement("div", {
  id: "hydra-overlay-modal"
}, _withHeader && React.createElement(_Header, {
  closeModal: deactivate,
  headerText: headerText
}), React.createElement(_Body, null, children), _withFooter && React.createElement(_Footer, {
  closeModal: deactivate
}));
const Modal = props => React.createElement(Overlay.Consumer, null, context => {
  if (!context) return null;
  const {
    Container = ModalContainer
  } = props;
  return React.createElement(Container, Object.assign({}, props, context));
});

export { Alert, BACKGROUND_TYPE, Background, BlurryBackground, Button, DarkBackground, Modal, ModalBody, ModalContainer, ModalFooter, ModalHeader, NoBackground, Overlay };
//# sourceMappingURL=index.modern.js.map
