import React, { FC } from "react";

/** This is a generic Button component meant to be extended with any functionality you want */
export const Button: FC<ReactButton> = (props) => <button {...props} />;

export type ButtonRowProps = {
  id?: string;
  position: "left" | "right";
} & StyleOverride;
export const ButtonRow: FC<ButtonRowProps> = ({
  position = "right",
  id,
  children,
  style,
}) => (
  <div id={id} style={{ textAlign: position, ...style }}>
    {children}
  </div>
);

type CloseProps = {
  onClick: () => void;
} & ReactButton;
/** This is a super-specific close button that's got terrible CSS but look, no SVG's! */
export const Close: React.FC<CloseProps> = (props) => (
  <Button
    {...props}
    style={{
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
      ...props.style,
    }}
    onClick={() => props.onClick()}
  >
    <div
      style={{
        position: "absolute",
        width: "32px",
        height: "32px",
        transform: "rotate(45deg)",
        borderRadius: "32px",
        top: "0px",
      }}
    >
      +
    </div>
  </Button>
);
