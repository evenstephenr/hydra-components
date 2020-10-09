import React from "react";
import { Overlay, Modal, Panel, Alerts } from "components";
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

/** Hooking into Overlay.Consumer directly to build a custom Component for a Modal */
const ModalFooter = ({ style, closeModal }) => (
  <Overlay.Consumer>
    {(context) => {
      if (!context) return null;
      return (
        <div style={style}>
          <button
            onClick={() => {
              alert("submit!");
              context.deactivate();
            }}
          >
            Submit
          </button>
          <button onClick={() => closeModal()}>Close</button>
        </div>
      );
    }}
  </Overlay.Consumer>
);

/** Using a stock Modal */
const Message = () => (
  <Modal headerText="This is a Modal" Footer={ModalFooter}>
    <div>hello hi hey</div>
  </Modal>
);

const Flyout = () => (
  <Panel headerText="This is a Panel!">
    <div>hello hi hey</div>
  </Panel>
);

const componentMap = {
  DEFAULT: Default,
  MODAL: Message,
  PANEL: Flyout,
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
