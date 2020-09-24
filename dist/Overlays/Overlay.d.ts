import React from "react";
import { BackgroundProps } from "./Backgrounds";
export declare type OverlayContext = {
    isActive: boolean;
    activate: CB<OpenOptions, void>;
    deactivate: Noop<void>;
} & OverlayProviderProps;
export declare type OverlayProviderProps = {
    componentMap: {
        [k: string]: React.ReactNode;
    };
} & BackgroundProps;
declare type OpenOptions = {
    component: string;
};
export declare const Overlay: {
    Consumer: React.Consumer<OverlayContext | null>;
    Provider: React.FC<OverlayProviderProps>;
};
export {};
