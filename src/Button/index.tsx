/// <reference path="../global.d.ts" />
import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ReactButton;

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  console.log("hello from hydra/packages/components");
  return <button {...rest}>{children}</button>;
};

type CloseProps = {
  close: () => void;
} & StyleOverride;

export const Close: React.FC<CloseProps> = ({ close, style }) => (
  <button
    style={{
      fontSize: "32px",
      width: "32px",
      height: "32px",
      lineHeight: "32px",
      transform: "rotate(45deg)",
      borderRadius: "32px",
      background: "none",
      border: "none",
      outline: "none",
      cursor: "pointer",
      padding: "unset",
      ...style,
    }}
    onClick={() => close()}
  >
    +
  </button>
);
