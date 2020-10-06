import React, { FC, useState } from "react";
import styled, { css } from "styled-components";
import { Button } from "../Button";
import { Overlay, OverlayContext } from "./Overlay";
import { Header, Body, Footer } from "./Shared";
import { slideLeft } from "../Styles";

type PanelHeaderProps = {
  headerText?: string;
  closePanel: () => void;
} & StyleOverride;
export const PanelHeader: FC<PanelHeaderProps> = ({ closePanel, ...rest }) => (
  <Header id="hydra-panel-header" onClick={() => closePanel()} {...rest} />
);

type PanelFooterProps = {
  closePanel: () => void;
} & StyleOverride;
export const PanelFooter: FC<PanelFooterProps> = ({ closePanel, style }) => (
  <Footer id="hydra-panel-footer" position="right" style={style}>
    <Button onClick={() => closePanel()}>Close</Button>
  </Footer>
);

export const PanelBody: FC<StyleOverride> = (props) => (
  <Body id="hydra-panel-body" {...props} />
);

type PanelProps = {
  Container?: FC<PanelContainerProps>;
  Header?: FC<PanelHeaderProps>;
  headerText?: string;
  width?: string;
  height?: string;
  withHeader?: boolean;
  Body?: FC;
  Footer?: FC<PanelFooterProps>;
  withFooter?: boolean;
  styleOverrides?: {
    container?: React.CSSProperties;
    header?: React.CSSProperties;
    body?: React.CSSProperties;
    footer?: React.CSSProperties;
  };
  position?: "left" | "right";
  animate?: boolean;
} & PanelHeaderProps;

type PanelContainerProps = PanelProps & OverlayContext;

const slideInMixin = () => css`
  right: -600px;
  animation: ${slideLeft(-600)} 250ms ease-out forwards;
`;
const slideOutMixin = () => css`
  right: 0px;
  animation: ${slideLeft(600)} 250ms ease-out forwards;
`;

const PanelWrapper: FC<any> = styled.div`
  ${(props: any) => (props.isOpen ? slideInMixin : slideOutMixin)}
`;

export const PanelContainer: FC<PanelContainerProps> = ({
  children,
  styleOverrides,
  width = "600px",
  height = "100%",
  withHeader = true,
  headerText,
  Header = PanelHeader,
  Body = PanelBody,
  withFooter = true,
  Footer = PanelFooter,
  deactivate,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <PanelWrapper
      id="hydra-overlay-panel"
      isOpen={isOpen}
      style={{
        width,
        height,
        position: "fixed",
        top: "0px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: "14px 16px 24px 16px",
        overflow: "auto",
        wordBreak: "break-word",
        ...styleOverrides?.container,
      }}
    >
      {withHeader && (
        <Header
          headerText={headerText}
          style={styleOverrides?.header}
          closePanel={() => deactivate()}
        />
      )}
      <Body style={styleOverrides?.body}>{children}</Body>
      {withFooter && (
        <Footer
          closePanel={() => {
            setIsOpen(false);
            setTimeout(() => deactivate(), 250);
          }}
          style={styleOverrides?.footer}
        />
      )}
    </PanelWrapper>
  );
};

export const Panel = (props: PanelProps) => (
  <Overlay.Consumer>
    {(context) => {
      if (!context) return null;
      const { Container = PanelContainer, ...rest } = props;
      return <Container {...rest} {...context} />;
    }}
  </Overlay.Consumer>
);
