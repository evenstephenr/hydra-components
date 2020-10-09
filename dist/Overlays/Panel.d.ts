import React, { FC } from "react";
import { OverlayContext } from "./Overlay";
declare type PanelHeaderProps = {
    headerText?: string;
    closePanel: () => void;
} & StyleOverride;
export declare const PanelHeader: FC<PanelHeaderProps>;
declare type PanelFooterProps = {
    closePanel: () => void;
} & StyleOverride;
export declare const PanelFooter: FC<PanelFooterProps>;
export declare const PanelBody: FC<StyleOverride>;
declare type PanelProps = {
    Container?: FC<PanelContainerProps>;
    Header?: FC<PanelHeaderProps>;
    headerText?: string;
    width?: string;
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
declare type PanelContainerProps = PanelProps & OverlayContext;
export declare const PanelContainer: FC<PanelContainerProps>;
export declare const Panel: (props: PanelProps) => JSX.Element;
export {};
