import React from "react";

declare global {
  type ReactButton = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  type Noop<R> = () => R;
  type CB<P, R> = (props: P) => R;
}
