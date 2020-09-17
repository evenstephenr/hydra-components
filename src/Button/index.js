import React from 'react';

export const Button = (props) => {
  const { children, ...rest } = props;
  console.log('hello from hydra/packages/components')
  return (
    <button {...rest}>
      {children}
    </button>
  );
}
