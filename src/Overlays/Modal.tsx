import React, { FC } from "react";
import { Overlay, OverlayContext } from "./Overlay";
import { COLOR } from "../Theme";
import { Close } from "../Button";

/**
 * TODO:
 *
 * - add style overrides for each part of the Modal (style prop)
 * - add logic to automatically take up full width and height of page for smaller screens
 */

type ModalHeaderProps = {
  headerText?: string;
  closeModal: () => void;
} & StyleOverride;
export const ModalHeader: FC<ModalHeaderProps> = ({
  headerText,
  closeModal,
  style,
}) => (
  <div
    id="hydra-modal-header"
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
      close={() => closeModal()}
      style={{ position: "absolute", top: "0px", right: "0px" }}
    />
  </div>
);

export const ModalBody: FC<StyleOverride> = ({ children, style }) => (
  <div
    id="hydra-modal-body"
    style={{
      flex: 1,
      ...style,
    }}
  >
    {children}
  </div>
);

type ModalFooterProps = {
  closeModal: () => void;
} & StyleOverride;
export const ModalFooter: FC<ModalFooterProps> = ({ closeModal }) => (
  <div>
    <button onClick={() => closeModal()}>close</button>
  </div>
);

type ModalContainerProps = {
  Container?: FC<ModalContainerProps>;
  Header?: FC<ModalHeaderProps>;
  headerText?: string;
  width?: number;
  height?: number;
  withHeader?: boolean;
  Body?: FC;
  Footer?: FC<ModalFooterProps>;
  withFooter?: boolean;
  styleOverrides?: {
    container?: React.CSSProperties;
    header?: React.CSSProperties;
    body?: React.CSSProperties;
    footer?: React.CSSProperties;
  };
} & ModalHeaderProps;

type ModalProps = ModalContainerProps & OverlayContext;

export const ModalContainer: FC<ModalProps> = ({
  children,
  deactivate,
  headerText,
  styleOverrides,
  width = 600,
  height = 550,
  withHeader = true,
  Header = ModalHeader,
  Body = ModalBody,
  withFooter = true,
  Footer = ModalFooter,
}) => (
  <div
    id="hydra-overlay-modal"
    style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: "#fff",
      borderRadius: "2px",
      boxShadow: `0px 0px 8px 4px ${COLOR.GRAY[300]}`,
      position: "absolute",
      left: "50%",
      marginLeft: `-${Math.floor(width / 2)}px`,
      top: "16%",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      padding: "14px 16px 24px 16px",
      ...styleOverrides?.container,
    }}
  >
    {withHeader && <Header closeModal={deactivate} headerText={headerText} />}
    <Body style={styleOverrides?.body}>{children}</Body>
    {withFooter && <Footer closeModal={deactivate} />}
  </div>
);

export const Modal = (props: ModalContainerProps) => (
  <Overlay.Consumer>
    {(context) => {
      if (!context) return null;
      const { Container = ModalContainer } = props;
      return <Container {...props} {...context} />;
    }}
  </Overlay.Consumer>
);
