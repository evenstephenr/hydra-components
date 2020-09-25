import React, { FC } from "react";

/** This is a generic Button component meant to be extended with any functionality you want */
export const Button: FC<ReactButton> = (props) => {
  const { children, ...rest } = props;
  return <button {...rest}>{children}</button>;
};

type ButtonRowProps = {
  position: "left" | "right";
} & StyleOverride;
export const ButtonRow: FC<ButtonRowProps> = ({
  children,
  position = "right",
  style,
}) => <div style={{ textAlign: position, ...style }}>{children}</div>;
