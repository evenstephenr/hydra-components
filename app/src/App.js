import React, { createRef } from "react";
import { Overlay, Modal, Panel, Alerts, useKeydown, useClick, ModalContainer } from "components";
import "./App.css";

const SampleCustom = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};

const Activator = () => (
  <Overlay.Consumer>
    {(context) => {
      if (!context) return null;
      return (
        <>
          <div>
            <button onClick={() => context.activate({ component: "DEFAULT" })}>
              activate custom
            </button>
            <button onClick={() => context.activate({ component: "MODAL" })}>
              activate Modal
            </button>
            <button onClick={() => context.activate({ component: "PANEL" })}>
              activate Panel
            </button>
            <button onClick={() => context.activate({ component: "EVENTS_MODAL" })}>
              activate Modal with events
            </button>
          </div>
          <div>
            <Alerts.Consumer>
              {({ activate }) => (
                <>
                  <button
                    onClick={() =>
                      activate({
                        message: "oh no",
                      })
                    }
                  >
                    activate alert
                  </button>
                  <button
                    onClick={() =>
                      activate({
                        message: "Sup",
                      })
                    }
                  >
                    activate alert
                  </button>
                </>
              )}
            </Alerts.Consumer>
          </div>
        </>
      );
    }}
  </Overlay.Consumer>
);

/** Hooking into Overlay.Consumer directly to build a custom Component */
const Default = () => (
  <Overlay.Consumer>
    {(context) => {
      if (!context) return null;
      return (
        <>
          <div>hello hi hey</div>
          <button onClick={() => context.deactivate()}>deactivate</button>
        </>
      );
    }}
  </Overlay.Consumer>
);

/** Building a custom Component for a Modal */
const ModalFooter = ({ style, closeModal }) => (
  <div style={style}>
    <button
      onClick={() => {
        alert("submit!");
        closeModal();
      }}
    >
      Submit
    </button>
    <button onClick={() => closeModal()}>Close</button>
  </div>
);

/** Using a stock Modal */
const Message = () => (
  <Modal headerText="This is a Modal" Footer={ModalFooter}>
    <div>hello hi hey</div>
  </Modal>
);

/** stock Panel */
const Flyout = () => (
  <Panel headerText="This is a Panel!">
    <div>hello hi hey</div>
  </Panel>
);

/** Custom ModalContainer that adds Event middleware */
const EventModal = context => {
  const ref = createRef();

  useKeydown({
    'Escape': () => context.deactivate(),
  });

  useClick((e) => {
    if (!(ref?.current?.contains(e.target))) {
      context.deactivate();
    }
  });

  return (
    <ModalContainer
      ref={ref}
      headerText="This is a Modal that listens to events"
      {...context}
    >
      <div>hello hi hey</div>
    </ModalContainer>
  );
};

const componentMap = {
  DEFAULT: Default,
  MODAL: Message,
  PANEL: Flyout,
  EVENTS_MODAL: () => <Modal Container={EventModal} />,
};

export const App = () => (
  <Overlay.Provider componentMap={componentMap}>
    <Alerts.Provider duration={5000}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <div>heyo</div>
        <Activator />
        <SampleCustom />
      </div>
    </Alerts.Provider>
  </Overlay.Provider>
);
