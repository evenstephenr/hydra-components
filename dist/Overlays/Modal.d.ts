import React, { FC } from "react";
/**
 * TODO:
 *
 * - add style overrides for each part of the Modal (style prop)
 * - add logic to automatically take up full width and height of page for smaller screens
 */
declare type ModalHeaderProps = {
    headerText?: string;
    closeModal: () => void;
} & StyleOverride;
export declare const ModalHeader: FC<ModalHeaderProps>;
declare type ModalFooterProps = {
    closeModal: () => void;
} & StyleOverride;
export declare const ModalFooter: FC<ModalFooterProps>;
export declare const ModalBody: FC<StyleOverride>;
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
export declare const ModalContainer: React.ForwardRefExoticComponent<{
    Container?: React.FC<ModalContainerProps> | undefined;
    Header?: React.FC<ModalHeaderProps> | undefined;
    headerText?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    withHeader?: boolean | undefined;
    Body?: React.FC<{}> | undefined;
    Footer?: React.FC<ModalFooterProps> | undefined;
    withFooter?: boolean | undefined;
    styleOverrides?: {
        container?: React.CSSProperties | undefined;
        header?: React.CSSProperties | undefined;
        body?: React.CSSProperties | undefined;
        footer?: React.CSSProperties | undefined;
    } | undefined;
} & {
    headerText?: string | undefined;
    closeModal: () => void;
} & StyleOverride & {
    isActive: boolean;
    activate: CB<{
        component: string;
    }, void>;
    deactivate: Noop<void>;
} & {
    componentMap: {
        [k: string]: React.ReactNode;
    };
} & import("./Backgrounds").BackgroundProps & React.RefAttributes<HTMLDivElement>>;
export declare const Modal: (props: ModalContainerProps) => JSX.Element;
export {};
