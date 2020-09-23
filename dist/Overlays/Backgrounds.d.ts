import { FC } from "react";
export declare enum BACKGROUND_TYPE {
    NONE = "NONE",
    DARKEN = "DARKEN",
    BLUR = "BLUR"
}
export declare type BackgroundProps = {
    backgroundThreshold?: number;
    backgroundType?: BACKGROUND_TYPE;
};
export declare const NoBackground: FC;
export declare const DarkBackground: FC<BackgroundProps>;
export declare const BlurryBackground: FC<BackgroundProps>;
export declare const Background: FC<BackgroundProps>;
