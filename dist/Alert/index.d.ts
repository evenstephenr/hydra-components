import React from "react";
declare type AlertProps = {
    id: string;
    dismiss: () => void;
} & StyleOverride;
export declare const Alert: React.FC<AlertProps>;
declare type ActivateOptions = {
    message: string;
    duration?: number;
} & StyleOverride;
export declare type AlertContext = {
    /** is there any alert currently visible? */
    isActive: boolean;
    /** renders the alert to be shown, given provided opts */
    activate: (o: ActivateOptions) => void;
    position: AlertPosition;
};
declare type AlertPosition = "TOP" | "BOTTOM_LEFT";
declare type AlertProviderProps = {
    /** duration before alerts disappear (in ms) */
    duration?: number;
    /** position where the toasts will render */
    position?: AlertPosition;
};
export declare const Alerts: {
    Consumer: React.Consumer<AlertContext | null>;
    Provider: React.FC<AlertProviderProps>;
};
export {};
