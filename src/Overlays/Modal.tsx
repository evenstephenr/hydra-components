import React, { FC } from "react";
import { Overlay, OverlayContext } from "./Overlay";
import { COLOR } from "../Theme";
import { Button } from "../Button";
import { Header, Body, Footer } from "./Shared";
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
export const ModalHeader: FC<ModalHeaderProps> = ({ closeModal, ...rest }) => (
  <Header id="hydra-modal-header" onClick={() => closeModal()} {...rest} />
);

type ModalFooterProps = {
  closeModal: () => void;
} & StyleOverride;
export const ModalFooter: FC<ModalFooterProps> = ({ closeModal, style }) => (
  <Footer id="hydra-modal-footer" position="right" style={style}>
    <Button onClick={() => closeModal()}>close</Button>
  </Footer>
);

export const ModalBody: FC<StyleOverride> = (props) => (
  <Body id="hydra-modal-body" {...props} />
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
      borderRadius: "2px",
      boxShadow: `0px 0px 8px 4px ${COLOR.GRAY[300]}`,
      backgroundColor: "#fff",
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
    {withHeader && (
      <Header
        closeModal={deactivate}
        headerText={headerText}
        style={styleOverrides?.header}
      />
    )}
    <Body style={styleOverrides?.body}>{children}</Body>
    {withFooter && (
      <Footer closeModal={deactivate} style={styleOverrides?.footer} />
    )}
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
