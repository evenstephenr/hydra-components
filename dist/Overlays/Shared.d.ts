import React from "react";
import { ButtonRowProps } from "../Button";
declare type CloseProps = {
    onClick: () => void;
} & ReactButton;
/** This is a super-specific close button that's got terrible CSS but look ma, no SVG's! */
export declare const Close: React.FC<CloseProps>;
declare type SharedComponentProps = {
    id: string;
};
declare type SharedHeaderProps = {
    headerText?: string;
    onClick: () => void;
} & SharedComponentProps & StyleOverride;
export declare const Header: React.FC<SharedHeaderProps>;
declare type SharedBodyProps = SharedComponentProps & StyleOverride;
export declare const Body: React.FC<SharedBodyProps>;
declare type SharedFooterProps = ButtonRowProps;
export declare const Footer: React.FC<SharedFooterProps>;
export {};
