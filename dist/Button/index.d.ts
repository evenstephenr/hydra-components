import { FC } from "react";
/** This is a generic Button component meant to be extended with any functionality you want */
export declare const Button: FC<ReactButton>;
export declare type ButtonRowProps = {
    id?: string;
    position: "left" | "right";
} & StyleOverride;
export declare const ButtonRow: FC<ButtonRowProps>;
