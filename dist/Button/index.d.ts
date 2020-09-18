/// <reference path="../src/global.d.ts" />
import { ReactNode } from 'react';
declare type ButtonProps = {
    children: ReactNode;
} & ReactButton;
export declare const Button: (props: ButtonProps) => JSX.Element;
export {};
