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
