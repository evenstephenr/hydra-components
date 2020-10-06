import React, { useState, createContext } from "react";
import { BackgroundProps, Background } from "./Backgrounds";

export type OverlayContext = {
  isActive: boolean; // will be true if the overlay is 'active'
  activate: CB<OpenOptions, void>; // will render an Overlay component with the given options
  // onActivate: Noop<void>; // provided as a hook for consumers
  deactivate: Noop<void>; // passed down to OpenOptions.component as a render prop
  // onDeactivate: Noop<void>; // provided as a hook for consumers
} & OverlayProviderProps;

const { Consumer: C, Provider: P } = createContext<OverlayContext | null>(null);

export type OverlayProviderProps = {
  componentMap: { [k: string]: React.ReactNode }; // registers a list of components to render based on 'active' state
  // height?: number; // allow to be defined, don't allow to be larger than 100%
  // width?: number; // allow to be defined, don't allow to be larger than 100%
} & BackgroundProps;

type OpenOptions = {
  component: string;
  // onActivate?: Noop<void>; // callback for consumers
  // onDeactivate?: Noop<void>; // callback for consumers
  // props: any, // TODO: can't you pass this directly?
  // closeTriggers: 'DEFAULT' | 'CLICK' | 'KEY' // TODO: should different overlays have different close logic?
};

type State = {
  isActive: boolean;
  component?: string;
};

/**
 * This is the root Overlay Provider for any component that needs to present itself outside of the normal DOM hierarchy
 *
 * @param {boolean} canClickThrough (optional)
 *  - if true, allows click events through overlay when overlay is 'active'
 *  - defaults to false
 *
 * TODO:
 * - Should event hooks (onDeactivate, onActivate) be passed down the DOM? Should they live in Modal, Toast, etc.
 * - All raw HTML elements should be configurable (as components), with default styles exposed as exports
 * - Find a better way to document props
 */
const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
  backgroundType,
  backgroundThreshold, // when backgroundType === BLUR, filter: blur(backgroundThreshold * 10 + 'px')
  componentMap,
}) => {
  const [overlayState, setOverlayState] = useState<State>({
    isActive: false,
  });

  const activate: CB<OpenOptions, void> = ({ component }) =>
    setOverlayState({ component, isActive: true });

  const deactivate: Noop<void> = () => setOverlayState({ isActive: false });

  const { component, isActive } = overlayState;

  const Component = (component && componentMap[component]) as React.ElementType;

  return (
    <P
      value={{
        isActive,
        componentMap,
        backgroundType,
        backgroundThreshold,
        activate,
        deactivate,
      }}
    >
      <div id="hydra-overlay-wrapper">{children}</div>
      <div
        id="hydra-overlay"
        style={{
          position: "fixed",
          left: "0px",
          top: "0px",
          width: "100vw",
          height: "100vh",
          pointerEvents: isActive ? "initial" : "none",
        }}
      >
        {isActive && (
          <Background
            backgroundType={backgroundType}
            backgroundThreshold={backgroundThreshold}
          >
            <Component />
          </Background>
        )}
      </div>
    </P>
  );
};

const OverlayConsumer = C;

export const Overlay = {
  Consumer: OverlayConsumer,
  Provider: OverlayProvider,
};
