import { FC } from "react";
export declare type BackgroundProps = {
    backgroundThreshold?: number;
    backgroundType?: "NONE" | "DARKEN" | "BLUR";
};
export declare const NoBackground: FC;
export declare const DarkBackground: FC<BackgroundProps>;
export declare const BlurryBackground: FC<BackgroundProps>;
export declare const Background: FC<BackgroundProps>;
