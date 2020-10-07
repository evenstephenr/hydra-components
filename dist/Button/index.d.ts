import React, { FC } from "react";
/** This is a generic Button component meant to be extended with any functionality you want */
export declare const Button: FC<ReactButton>;
export declare type ButtonRowProps = {
    id?: string;
    position: "left" | "right";
} & StyleOverride;
export declare const ButtonRow: FC<ButtonRowProps>;
declare type CloseProps = {
    onClick: () => void;
} & ReactButton;
/** This is a super-specific close button that's got terrible CSS but look ma, no SVG's! */
export declare const Close: React.FC<CloseProps>;
export {};
