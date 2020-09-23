import React from "react";
import { BackgroundProps } from "./Backgrounds";
declare type ProviderProps = {
    componentMap: {
        [k: string]: React.ReactNode;
    };
} & BackgroundProps;
declare type OpenOptions = {
    component: string;
};
declare type Context = {
    isActive: boolean;
    activate: CB<OpenOptions, void>;
    deactivate: Noop<void>;
} & ProviderProps;
export declare const Overlay: {
    Consumer: React.Consumer<Context | null>;
    Provider: React.FC<ProviderProps>;
};
export {};
