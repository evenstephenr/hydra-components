/// <reference path="../global.d.ts" />
import React, { ReactNode } from 'react';


type ButtonProps = {
  children: ReactNode,
} & ReactButton

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  console.log('hello from hydra/packages/components')
  return (
    <button {...rest}>
      {children}
    </button>
  );
}
