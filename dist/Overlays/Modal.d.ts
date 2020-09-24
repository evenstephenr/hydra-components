import { FC } from "react";
import { OverlayContext } from "./Overlay";
/**
 * TODO:
 *
 * - add Body prop so body of Container can be overridden
 * - add Footer prop so body of Container can be overridden
 * - add style overrides for each part of the Modal (style prop)
 * - add logic to automatically take up full width and height of page for smaller screens
 */
declare type ModalHeaderProps = {
    headerText?: string;
    closeModal: () => void;
};
export declare const ModalHeader: FC<ModalHeaderProps>;
export declare const ModalBody: FC;
declare type ModalFooterProps = {
    closeModal: () => void;
};
export declare const ModalFooter: FC<ModalFooterProps>;
declare type ModalContainerProps = {
    Container?: FC<ModalContainerProps>;
    Header?: FC<ModalHeaderProps>;
    withHeader?: boolean;
    Body?: FC;
    Footer?: FC<ModalFooterProps>;
    withFooter?: boolean;
} & ModalHeaderProps;
declare type ModalProps = ModalContainerProps & OverlayContext;
export declare const ModalContainer: FC<ModalProps>;
export declare const Modal: (props: ModalContainerProps) => JSX.Element;
export {};
