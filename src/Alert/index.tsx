import React from "react";
import { CSSProperties } from "styled-components";
import { COLOR } from "../Theme";
import { Close } from "../Button";

type AlertProps = {
  id: string;
  dismiss: () => void;
} & StyleOverride;
export const Alert: React.FC<AlertProps> = ({
  children,
  id,
  dismiss,
  style,
}) => (
  <C>
    {(context) => {
      if (!context) return null;
      const { position } = context;

      function generateStyles(p: AlertPosition): CSSProperties {
        switch (p) {
          case "BOTTOM_LEFT":
            return {
              marginTop: "20px",
            };
          case "TOP":
          default:
            return {
              marginBottom: "20px",
            };
        }
      }

      return (
        <div
          id={`hydra-alert-${id}`}
          style={{
            position: "relative",
            boxShadow: `0px 0px 4px 4px ${COLOR.GRAY[300]}`,
            backgroundColor: `${COLOR.GRAY[100]}`,
            width: "350px",
            padding: "20px",
            paddingRight: "38px",
            ...generateStyles(position),
            ...style,
          }}
        >
          {children}
          <Close
            onClick={() => dismiss()}
            style={{
              position: "absolute",
              top: "13px",
              right: "7px",
              opacity: "0.4",
            }}
          />
        </div>
      );
    }}
  </C>
);

//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
const randomString = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

type ActivateOptions = {
  message: string;
  duration?: number;
} & StyleOverride;

export type AlertContext = {
  /** is there any alert currently visible? */
  isActive: boolean;
  /** renders the alert to be shown, given provided opts */
  activate: (o: ActivateOptions) => void;
  position: AlertPosition;
};

const { Consumer: C, Provider: P } = React.createContext<AlertContext | null>(
  null
);

type AlertState = { [k: string]: { message: string } & StyleOverride };
type AlertActions =
  | { type: "ADD"; alertId: string; message: string; style?: CSSProperties }
  | { type: "REMOVE"; alertId: string };
const reducer = (state: AlertState, action: AlertActions): AlertState => {
  switch (action.type) {
    case "ADD": {
      const { alertId, message, style } = action;
      return {
        ...state,
        [alertId]: { message, style },
      };
    }
    case "REMOVE": {
      const { alertId } = action;
      const mutatedState = { ...state };
      delete mutatedState[alertId];
      return mutatedState;
    }
    default:
      return state;
  }
};

type AlertPosition = "TOP" | "BOTTOM_LEFT";

type AlertProviderProps = {
  /** duration before alerts disappear (in ms) */
  duration?: number;
  /** position where the toasts will render */
  position?: AlertPosition;
};

const AlertProvider: React.FC<AlertProviderProps> = ({
  children,
  duration = 10000,
  position = "TOP",
}) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  const activate = (o: ActivateOptions) => {
    const { message, duration: d, style } = o;
    const alertId = randomString();
    const newAlertDuration = d || duration;

    setTimeout(() => dispatch({ type: "REMOVE", alertId }), newAlertDuration);

    dispatch({
      type: "ADD",
      message,
      style,
      alertId,
    });
  };

  function generateStyles(position?: AlertPosition): CSSProperties {
    switch (position) {
      case "BOTTOM_LEFT":
        return {
          left: "0px",
          bottom: "0px",
        };
      case "TOP":
      default:
        return {
          top: "0px",
          left: "calc(50% - 194px)",
        };
    }
  }

  return (
    <P
      value={{
        isActive: false,
        activate,
        position,
      }}
    >
      <div>{children}</div>
      <div
        id="hydra-alert-drawer"
        style={{
          position: "fixed",
          margin: "20px",
          ...generateStyles(position),
        }}
      >
        {Object.keys(state).map((alertKey) => {
          const { message, style } = state[alertKey];
          return (
            <Alert
              key={alertKey}
              id={alertKey}
              dismiss={() => dispatch({ type: "REMOVE", alertId: alertKey })}
              style={style}
            >
              {message}
            </Alert>
          );
        })}
      </div>
    </P>
  );
};

export const Alerts = {
  Consumer: C,
  Provider: AlertProvider,
};
