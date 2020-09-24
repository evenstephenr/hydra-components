import React from "react";
import { Overlay, Modal } from "components";
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
          <button onClick={() => context.activate({ component: "DEFAULT" })}>
            activate
          </button>
          <button onClick={() => context.activate({ component: "MODAL" })}>
            activate Modal
          </button>
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

/** Using a stock Modal */
const Message = () => (
  <Modal headerText="This is a Modal">
    <div>hello hi hey</div>
  </Modal>
);

const componentMap = {
  DEFAULT: Default,
  MODAL: Message,
};

export const App = () => (
  <Overlay.Provider componentMap={componentMap}>
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
  </Overlay.Provider>
);
