import React from "react";
import { Close, ButtonRow, ButtonRowProps } from "../Button";

type SharedComponentProps = {
  id: string;
};

type SharedHeaderProps = {
  headerText?: string;
  onClick: () => void;
} & SharedComponentProps &
  StyleOverride;
export const Header: React.FC<SharedHeaderProps> = ({
  id,
  headerText,
  onClick,
  style,
}) => (
  <div
    id={id}
    style={{
      minHeight: "32px",
      position: "relative",
      ...style,
    }}
  >
    {headerText && (
      <h3
        style={{
          margin: "unset",
          lineHeight: "32px",
        }}
      >
        {headerText}
      </h3>
    )}
    <Close
      onClick={() => onClick()}
      style={{ position: "absolute", top: "0px", right: "0px" }}
      autoFocus
    />
  </div>
);

type SharedBodyProps = SharedComponentProps & StyleOverride;
export const Body: React.FC<SharedBodyProps> = ({ children, id, style }) => (
  <div
    id={id}
    style={{
      flex: 1,
      paddingTop: "16px",
      paddingBottom: "24px",
      ...style,
    }}
  >
    {children}
  </div>
);

type SharedFooterProps = ButtonRowProps;
export const Footer: React.FC<SharedFooterProps> = (props) => (
  <ButtonRow {...props} />
);
