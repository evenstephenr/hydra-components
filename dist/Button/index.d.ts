/// <reference path="../src/global.d.ts" />
import React, { ReactNode } from "react";
declare type ButtonProps = {
    children: ReactNode;
} & ReactButton;
export declare const Button: (props: ButtonProps) => JSX.Element;
declare type CloseProps = {
    close: () => void;
} & StyleOverride;
export declare const Close: React.FC<CloseProps>;
export {};
