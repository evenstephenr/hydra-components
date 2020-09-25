import React, { FC } from "react";
import { OverlayContext } from "./Overlay";
/**
 * TODO:
 *
 * - add style overrides for each part of the Modal (style prop)
 * - add logic to automatically take up full width and height of page for smaller screens
 */
declare type CloseProps = {
    onClick: () => void;
} & StyleOverride & ReactButton;
/** This is a super-specific close button that's got terrible CSS but look ma, no SVG's! */
export declare const Close: React.FC<CloseProps>;
declare type ModalHeaderProps = {
    headerText?: string;
    closeModal: () => void;
} & StyleOverride;
export declare const ModalHeader: FC<ModalHeaderProps>;
export declare const ModalBody: FC<StyleOverride>;
declare type ModalFooterProps = {
    closeModal: () => void;
} & StyleOverride;
export declare const ModalFooter: FC<ModalFooterProps>;
declare type ModalContainerProps = {
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
declare type ModalProps = ModalContainerProps & OverlayContext;
export declare const ModalContainer: FC<ModalProps>;
export declare const Modal: (props: ModalContainerProps) => JSX.Element;
export {};
