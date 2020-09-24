import React, { FC, useEffect } from "react";

export enum BACKGROUND_TYPE {
  NONE = "NONE",
  DARKEN = "DARKEN",
  BLUR = "BLUR",
}

export type BackgroundProps = {
  backgroundThreshold?: number; // the 'magnitude' of backgroundType
  backgroundType?: BACKGROUND_TYPE; // none, background with opacity, filter:blur
};

export const NoBackground: FC = ({ children }) => (
  <div
    id="hydra-overlay-background-container-none"
    style={{
      width: "100%",
      height: "100%",
    }}
  >
    {children}
  </div>
);

export const DarkBackground: FC<BackgroundProps> = ({
  children,
  backgroundThreshold = 0.65,
}) => (
  <div
    id="hydra-overlay-background-container-darken"
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: `rgba(223, 228, 234, ${backgroundThreshold})`,
    }}
  >
    {children}
  </div>
);

export const BlurryBackground: FC<BackgroundProps> = ({
  children,
  backgroundThreshold = 0.45,
}) => {
  useEffect(() => {
    const wrapper = document.getElementById("hydra-overlay-wrapper");
    if (wrapper) {
      wrapper.style.filter = `blur(${backgroundThreshold * 10}px)`;
    }
  }, []);

  return (
    <div
      id="hydra-overlay-background-container-blur"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};
export const Background: FC<BackgroundProps> = (props) => {
  switch (props.backgroundType) {
    case BACKGROUND_TYPE.DARKEN:
      return <DarkBackground {...props} />;
    case BACKGROUND_TYPE.BLUR:
      return <BlurryBackground {...props} />;
    case BACKGROUND_TYPE.NONE:
      return <NoBackground {...props} />;
    default:
      return <DarkBackground {...props} />;
  }
};
