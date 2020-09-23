import React from "react";
import { Overlay } from "components";
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
        <button onClick={() => context.activate({ component: "DEFAULT" })}>
          activate
        </button>
      );
    }}
  </Overlay.Consumer>
);

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

const componentMap = {
  DEFAULT: Default,
};

export const App = () => (
  <Overlay.Provider componentMap={componentMap}>
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f3f3f3",
      }}
    >
      <div>heyo</div>
      <Activator />
      <SampleCustom />
    </div>
  </Overlay.Provider>
);
