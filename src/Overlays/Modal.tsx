import React, { FC } from "react";
import { Overlay, OverlayContext } from "./Overlay";

/**
 * TODO:
 *
 * - add Body prop so body of Container can be overridden
 * - add Footer prop so body of Container can be overridden
 * - add style overrides for each part of the Modal (style prop)
 * - add logic to automatically take up full width and height of page for smaller screens
 */

type ModalHeaderProps = {
  headerText?: string;
  closeModal: () => void;
};
export const ModalHeader: FC<ModalHeaderProps> = ({
  headerText,
  closeModal,
}) => (
  <div id="hydra-modal-header">
    <p>{headerText}</p>
    <button onClick={() => closeModal()}>X</button>
  </div>
);

export const ModalBody: FC = ({ children }) => (
  <div id="hydra-modal-body">{children}</div>
);

type ModalFooterProps = {
  closeModal: () => void;
};
export const ModalFooter: FC<ModalFooterProps> = ({ closeModal }) => (
  <div>
    <button onClick={() => closeModal()}>close</button>
  </div>
);

type ModalContainerProps = {
  Container?: FC<ModalContainerProps>;
  Header?: FC<ModalHeaderProps>;
  withHeader?: boolean;
  Body?: FC;
  Footer?: FC<ModalFooterProps>;
  withFooter?: boolean;
} & ModalHeaderProps;

type ModalProps = ModalContainerProps & OverlayContext;

export const ModalContainer: FC<ModalProps> = ({
  children,
  deactivate,
  headerText,
  withHeader = true,
  Header = ModalHeader,
  Body = ModalBody,
  withFooter = true,
  Footer = ModalFooter,
}) => (
  <div id="hydra-overlay-modal">
    {withHeader && <Header closeModal={deactivate} headerText={headerText} />}
    <Body>{children}</Body>
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
